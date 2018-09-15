import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {CoursesDatabaseLayerProvProvider} from "../courses-database-layer-prov/courses-database-layer-prov";

@Injectable()
export class CoursesProvProvider {

  constructor(public http: Http, private coursesDatabaseLayerProvider: CoursesDatabaseLayerProvProvider) {
  }

  getCoursesByCategoryId(categoryId) {
    return Observable.create((observer) => {
      this.coursesDatabaseLayerProvider.getCoursesByCategoryId(categoryId)
        .then((selectedCourses) => {
            observer.next(selectedCourses)
          },
          err => {
            observer.error(err);
          })
    })
  }

}
