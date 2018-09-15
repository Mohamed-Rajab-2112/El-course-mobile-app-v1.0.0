import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiUrlProvider {
  private _baseUrl = 'assets/json/';
  private _firebaseBaseUrl = 'https://firestore.googleapis.com/v1beta1/projects/xsource-a0e3f/databases/(default)/documents/';

  constructor(public http: Http) {
    // this.getCoursesTEST()
    //   .subscribe((res) => console.log(res))
  }

  // getCoursesTEST() {
  //   return this.http.get(this._firebaseBaseUrl + 'courses/5e8CJWpHQs6PLA1yhifR')
  //     .map((res) => {
  //       return res.json();
  //     })
  // }

  getUrl() {
    return {
      categoriesUrl: this._baseUrl + 'categories.json',
      joinedCoursesUrl: this._baseUrl + 'joinedCourses.json',
      feedsCoursesUrl: this._baseUrl + 'interstsFeed.json',
      languageUrl: this._baseUrl + 'languages.json',
      countryUrl: this._baseUrl + 'countries.json',
      categoryWithCoursesUrl: this._baseUrl + 'categoryWithCourses.json',
      trainingCenters: this._baseUrl + 'trainingCenter.json',
      trainingCenterDetails: this._baseUrl + 'trainingCenterDetails.json',
      postQuestions: this._baseUrl + 'postQuestionsURL'
    }
  }

}
