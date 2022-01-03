import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { RestApiService } from '../shared/restApi/rest-api.service';
import { RestUrlConstants } from '../shared/urlConstant/url-constant';

@Injectable({
  providedIn: "root"
})

export class ListingPageService {
  constructor(private _restApiService : RestApiService){}

    getLatestNewsIds(): Observable<any>{
    return this._restApiService.getAPIStoriesData(RestUrlConstants.getNewStoryIds)
  }

    getTopStoriesIds(): Observable<any>{
    return this._restApiService.getAPIStoriesData(RestUrlConstants.getTopStoryIds)
  }

    getBestStoriesIds(): Observable<any>{
    return this._restApiService.getAPIStoriesData(RestUrlConstants.getBestStoryIds)
  }

    getDataById(id): Observable<any>{
    return this._restApiService.getAPIStoriesData(`item/${id}`+RestUrlConstants.getStoryDataByIds)
  }
}
