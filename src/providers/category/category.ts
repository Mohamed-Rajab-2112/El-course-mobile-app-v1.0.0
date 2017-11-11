import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryProvider {

  constructor(public http: Http) {
    console.log('Hello CategoryProvider Provider');
  }

  getCategories(): Observable<any> {
    return this.http.get('assets/json/categories.json')
      .map((response: Response) => {
        return response.json();
      })
  }

}
