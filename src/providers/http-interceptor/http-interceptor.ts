import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  constructor(public http: Http) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');

    return next.handle(req)
      .catch((error, caught) => {
        console.log('Error Occurred');
        console.log(error);

        return Observable.throw(error);
      }) as any;
  }

}
