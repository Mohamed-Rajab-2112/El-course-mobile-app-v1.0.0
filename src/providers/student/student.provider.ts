import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url.provider";

@Injectable()
export class StudentProvider {

  constructor(private http: Http, private apiUrl: ApiUrlProvider) {
    // console.log('Hello StudentProvider Provider');
  }

  getJoinedCourses(id) {
    return this.http.get(this.apiUrl.getUrl().joinedCoursesUrl).map((response: Response) => {
      return response.json();
    })
  }

  postQuestions(questions) {
    return this.http.post(this.apiUrl.getUrl().postQuestions, questions).map((response: Response) => {
      return response.json();
    })
  }

}
