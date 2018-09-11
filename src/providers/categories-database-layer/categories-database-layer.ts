import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url.provider";
import {Observable} from "rxjs/Observable";
import {SharedProvider} from "../shared/shared.provider";
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class CategoriesDatabaseLayerProvider {
  selectedCategoriesWithCourses = [];

  constructor(public http: Http, private apiUrl: ApiUrlProvider, private sharedProvider: SharedProvider, private angularFireStore: AngularFirestore) {
  }

  getCategoryWithCourses() {
    return Observable.create((observer) => {
      this.sharedProvider.getCategories()
        .subscribe((categories) => {
            // observer.next(categories);
            // alert(JSON.stringify(categories, null, 3));
            this._getCourseByCategoryIdForListOfCategories(categories, 0)
              .then(() => {
                observer.next(this.selectedCategoriesWithCourses);
              })
              .catch((err) => {
                observer.error(err)
              })
          },
          err => {
            observer.error(err)
          })
    })
  }

  private _getCourseByCategoryIdForListOfCategories(listOfCategories, i) {
    return new Promise((resolve, reject) => {
      let self = this;
      (function recursive() {
        if (i == listOfCategories.length) {
          resolve();
        } else {
          self.angularFireStore.collection('courses', (ref) => ref.where('categoryId', '==', listOfCategories[i].id).orderBy('createdDate').limit(10))
            .valueChanges()
            .subscribe((courses) => {

                // if (courses.length) {
                //   self.angularFireStore.collection('courses').add(courses[0]);
                // }
                self.selectedCategoriesWithCourses.push({
                  category: listOfCategories[i],
                  courses: courses
                });
                i++;
                recursive()
              },
              err => {
                reject(err);
              })
        }
      })();
    });
  }

}

