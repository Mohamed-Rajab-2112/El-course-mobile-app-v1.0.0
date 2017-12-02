import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url";

@Injectable()
export class CategoryProvider {

  constructor(private http: Http, private apiUrl: ApiUrlProvider) {
    // console.log('Hello CategoryProvider Provider');
  }

  getCategories() {
    return this.http.get(this.apiUrl.getUrl().categoriesUrl)
      .map((response: Response) => {
        return response.json();
      })
  }

}
