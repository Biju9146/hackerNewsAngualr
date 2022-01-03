import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import {LoaderService} from './shared/loader/loader.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The Hacker News';
  isSpinning$: Observable<boolean>;
  show : boolean;
  constructor(public spinner : NgxSpinnerService, private loaderService: LoaderService){
  }

  ngOnInit(): void {
    this.pageLoader();
  }

  pageLoader(){
  this.isSpinning$ = this.loaderService.loaderState;
  this.isSpinning$.subscribe(res=> {
    if(res){
      this.spinner.show();
    } else {
      setTimeout(() => {
        this.spinner.hide();
      }, 3000);
    }
  });
  }

}
