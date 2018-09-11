import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url.provider";
import {CategoriesDatabaseLayerProvider} from "../categories-database-layer/categories-database-layer";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {

  constructor(public http: Http, private apiUrl: ApiUrlProvider, private categoriesDatabaseLayer: CategoriesDatabaseLayerProvider) {
    console.log('Hello CategoriesProvider Provider');
  }

  getCategoryWithCourses() {
    return Observable.create((observer) => {
      this.categoriesDatabaseLayer.getCategoryWithCourses()
        .subscribe((categoriesWithLayer) => {
            observer.next(categoriesWithLayer)
          },
          err => {
            observer.error(err)
          });
    })
  }

}
