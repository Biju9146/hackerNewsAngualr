import { TestBed, async, inject } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoaderService } from './shared/loader/loader.service';



describe('AppComponent', () => {

  class LoaderServiceMock {
    get loaderState() {
      return of(true);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        NgxSpinnerService,
        {
        provide: LoaderService, useClass: LoaderServiceMock
      }]
    }).compileComponents();
  }));

  it('should create the app component!', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'The Hacker News'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('The Hacker News');
  });

  it('should render title in span!', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('The Hacker News');
  });

  it('should show loading Spinner when page is load!', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.pageLoader()
    const checkText = document.getElementById("spinner").innerText
    expect(checkText).toEqual("Loading...")
  });




});
