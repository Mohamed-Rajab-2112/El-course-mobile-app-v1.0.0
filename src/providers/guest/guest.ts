import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url";

@Injectable()
export class GuestProvider {

  constructor(public http: Http, private apiUrl: ApiUrlProvider) {
  }

  getFeeds(listOfInterests) {
    return this.http.get(this.apiUrl.getUrl().feedsCoursesUrl).map((res: Response) => {
      return res.json();
    });
  }

  getLanguage() {
    return this.http.get(this.apiUrl.getUrl().languageUrl).map((response: Response) => {
      return response.json();
    })
  }

  getCountries() {
    return this.http.get(this.apiUrl.getUrl().countryUrl).map((response: Response) => {
      return response.json();
    })
  }

  // getCategoryWithCourses() {
  //   return this.http.get(this.apiUrl.getUrl().categoryWithCoursesUrl).map((response: Response) => {
  //     return response.json();
  //   })
  // }

  getTrainingCenters() {
    return this.http.get(this.apiUrl.getUrl().trainingCenters).map((response: Response) => {
      return response.json();
    })
  }

  getTrainingCenterById(id) {
    return this.http.get(this.apiUrl.getUrl().trainingCenterDetails).map((response: Response) => {
      return response.json();
    })
  }
}
