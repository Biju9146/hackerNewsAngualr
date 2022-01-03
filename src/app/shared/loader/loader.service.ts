import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get loaderState(){
    return this.loaderSubject.asObservable();
  }

  constructor() { }

  show() {
    this.loaderSubject.next( true );
  }

  hide() {
    this.loaderSubject.next( false );
  }
}
