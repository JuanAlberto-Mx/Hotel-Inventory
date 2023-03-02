import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Request interceptor", request);

    // Creates a new HTTP header to use it everytime the method POST is launched
    if(request.method === 'POST') {
      // Create a custom HTTP Header
      const newRequest = request.clone({headers: new HttpHeaders({'token': '12ab34cd'})});

      // Set the HTTP header
      return next.handle(newRequest);
    }

    // Return the predefined HTTP header
    return next.handle(request);
  }
}
