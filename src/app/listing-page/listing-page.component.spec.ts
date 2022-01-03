import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageComponent } from './listing-page.component';
import { ListingPageService } from './listing-page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListingPageComponent', () => {
  let component: ListingPageComponent;
  let fixture: ComponentFixture<ListingPageComponent>;

  class NewsDataServiceMock {
    getLatestNewsIds() {
      return of([29716005,29715996]);
    }
    getBestStoriesIds() {
      return of([29716900,29736369]);
    }
    getTopStoriesIds() {
      return of([29761728, 29761092]);
    }

    getDataById() {
      return of({
        type:'story'
      });
    }

    hasNextPage() {
      return of(true);
    }

    getAPIStoriesData(){
      return of("newstories.json?print=pretty")
    }


  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [BrowserAnimationsModule, BrowserModule, HttpClientTestingModule,MatTableModule, MatPaginatorModule],
      declarations: [ ListingPageComponent ],
      providers : [
        {provide: ListingPageService, useClass : NewsDataServiceMock}],
    }).compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPageComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create listing page component', () => {
    expect(component).toBeTruthy();
  });


  it(`should called get Latest stories function!`, () => {
    component.storyType = "";
    component.getLatestStories();
    expect(component.storyType).toEqual("Latest");
  });

  it(`should called get Top Stories function!`, () => {
    component.storyType = "";
    component.getTopStories();
    expect(component.storyType).toEqual("Top")
  });

  it(`should called get Best Stories function!`, () => {
    component.storyType = "";
    component.getBestStories();
    expect(component.storyType).toEqual("Best")
  });

  it(`should get chunck of ids from get data from getLatestStories function!`, () => {
    component.storyType = "";
    // spyOn(ListingPageService,"getLatestNewsIds").and.returnValue(of([]))
    component.getLatestStories();
    expect(component.storyType).toEqual("Latest")
  });

  it('should show first page of list of 0, each page contains 10 items', () => {
      const rangeElement = fixture.nativeElement.querySelector('.mat-paginator-range-label');
      component.paginator.length = 0;
      component.paginator.pageSize = 10;
      component.paginator.pageIndex = 1;
      fixture.detectChanges();
      expect(rangeElement.textContent!.trim()).toBe('0 of 0');
    });

  it('should open URL in new window', () => {
    let url = "https://unherd.com/2022/01/how-we-lost-the-future/"
    component.openLink(url)
    expect(url).toEqual("https://unherd.com/2022/01/how-we-lost-the-future/")
  });

  it('should fetch more data on demand for Latest News!', () => {
    let checkSwitchCase = component.storyType = "Latest";
    component.loadMore()
    expect(checkSwitchCase).toEqual("Latest")
  });

  it('should fetch more data on demand for Best News!', () => {
    let checkSwitchCase = component.storyType = "Best";
    component.loadMore()
    expect(checkSwitchCase).toEqual("Best")
  });

  it('should fetch more data on demand for Top News!', () => {
    let checkSwitchCase = component.storyType = "Top";
    component.loadMore()
    expect(checkSwitchCase).toEqual("Top")
  });

  it('should show load more button at end of pagination !', () => {
    let checkHasNext = component.paginator.hasNextPage()
    component.onPaginateChange()
    expect(checkHasNext).toEqual(false)
  });




});
