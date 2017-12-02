import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiUrlProvider {
  private _baseUrl = 'assets/json/';

  constructor(public http: Http) {
    console.log('Hello ApiUrlProvider Provider');
  }

  getUrl() {
    return {
      categoriesUrl: this._baseUrl + 'categories.json',
      joinedCoursesUrl: this._baseUrl + 'joinedCourses.json',
      feedsCoursesUrl: this._baseUrl + 'interstsFeed.json',
      languageUrl: this._baseUrl + 'languages.json',
      countryUrl: this._baseUrl + 'countries.json',
      categoryWithCoursesUrl: this._baseUrl + 'categoryWithCourses.json'
    }
  }

}
