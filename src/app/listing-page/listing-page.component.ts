import {Component, OnInit, ViewChild } from '@angular/core';
import { ListingPageService } from './listing-page.service'
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface HackerNewsElement {
  position: number,
  by: string,
  descendants: number,
  id: number,
  kids: any,
  score: number,
  time: number,
  title: string,
  type: string,
  url: string
}

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent implements OnInit {
  startIndex: number = 0;
  endIndex: number = 150;
  bindingData : HackerNewsElement[] = [];
  storyType : string = "Latest";
  displayedColumns: string[] = ['position','by', 'score', 'title', 'type'];
  dataSource;
  loadMoreFlag: boolean = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private listingPageService : ListingPageService) { }

  ngOnInit(): void {
    // get latest News while onload page.
    this.getLatestStories();
  }

  // get top stories method
  getTopStories(){
    this.listingPageService.getTopStoriesIds().subscribe((responseData)=>{
      if(responseData.length > 0){
        this.loadMoreFlag = false;
        this.storyType = "Top";
        this.bindingData = []; // empty the data set of table.
        this.dataSource = new MatTableDataSource<HackerNewsElement>(this.bindingData); // empty the table before binding new data.
        this.getStoriesData(responseData)
      } else {
        this.loadMoreFlag = false;
        alert("Top Stories: No more data found!")
      }
    })
  }

  // get best stories method
  getBestStories(){
    this.listingPageService.getBestStoriesIds().subscribe((responseData)=>{
      if(responseData.length > 0){
        this.loadMoreFlag = false;
        this.storyType = "Best";
        this.bindingData = []; // empty the data set of table.
        this.dataSource = new MatTableDataSource<HackerNewsElement>(this.bindingData); // empty the table before binding new data.
        this.getStoriesData(responseData)
      } else {
        this.loadMoreFlag = false;
        alert("Best Stories: No more data found!")
      }
    })
  }

  // get Latest stories method
  getLatestStories(){
    this.listingPageService.getLatestNewsIds().subscribe((responseData)=>{
      this.storyType = "Latest"
      let shortedIds = this.shortIDs(responseData)
      this.startIndex = this.endIndex;
      this.endIndex += 50;
      if(shortedIds.length > 0){
        this.loadMoreFlag = false;
        this.getStoriesData(shortedIds)
      } else {
        this.startIndex = 0;
        this.endIndex = 200;
        this.loadMoreFlag = false;
        alert("Latest Stories: No more data found!")
      }
    })
  }

  // fetching stories data by id from getStoriesData method
  getStoriesData(arrayOfIds){
    arrayOfIds.map((itemsId)=>{
    this.listingPageService.getDataById(itemsId).subscribe((responseData)=>{

      if(responseData.type == "story"){
        this.bindingData.push(responseData);
        this.dataSource = new MatTableDataSource<HackerNewsElement>(this.bindingData);
        this.dataSource.paginator = this.paginator;
      }
    })
   })
  }

  // onPaginateChange method will check more data to load or not.
  onPaginateChange(){
    let nextPageFlag = this.dataSource.paginator.hasNextPage()
    if(!nextPageFlag){
      this.loadMoreFlag = true;
    } else {
      this.loadMoreFlag = false;
    }
  }

  // shortIDs method is used to set the ids in chunk wise for easy fetching data.
  shortIDs(arrayOfIds){
    return arrayOfIds.slice(this.startIndex,this.endIndex)
  }

  // openLink method is used to open url of stories on new tab.
  openLink(data){
    if (typeof data.url == 'undefined') {
      alert("No URL link present on "+data.by)
    } else{
      window.open(data.url, '_blank')
    }
  }

  // loadMore methoed is used to fetch more data from API if required.
  loadMore(){
    switch (this.storyType) {
      case "Latest":
          this.getLatestStories();
        break;
      case "Top":
          this.getTopStories();
        break;
      case "Best":
          this.getBestStories();
        break;
    }
  }
}
