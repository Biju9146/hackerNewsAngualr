import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class RestApiService {
    constructor(private http: HttpClient) {}

    public getAPIStoriesData = (route: string) => {
      return this.http.get(environment.newStoriesUrl + route);
    };


}
