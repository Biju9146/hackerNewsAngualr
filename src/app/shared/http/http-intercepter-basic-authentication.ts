import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });

    return next.handle(request).pipe(
      tap(
        event => (event),
        error => (error)
      )
    );
  }

}
