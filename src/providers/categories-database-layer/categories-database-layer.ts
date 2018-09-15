import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url.provider";
import {Observable} from "rxjs/Observable";
import {SharedProvider} from "../shared/shared.provider";
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from "rxjs/Subscription";
import {CoursesProvProvider} from "../courses-prov/courses-prov";
import {CoursesDatabaseLayerProvProvider} from "../courses-database-layer-prov/courses-database-layer-prov";

@Injectable()
export class CategoriesDatabaseLayerProvider {
  selectedCategoriesWithCourses = [];

  constructor(public http: Http, private apiUrl: ApiUrlProvider, private sharedProvider: SharedProvider, private angularFireStore: AngularFirestore, private coursesDatabaseLayerProvider: CoursesDatabaseLayerProvProvider) {
  }

  getCategoryWithCourses() {
    return Observable.create((observer) => {
      const getCategoriesSubscription = this.sharedProvider.getCategories()
        .subscribe((categories) => {
            this._getCourseByCategoryIdForListOfCategories(categories, 0)
              .then(() => {
                observer.next(this.selectedCategoriesWithCourses);
                getCategoriesSubscription && getCategoriesSubscription.unsubscribe()
              })
              .catch((err) => {
                observer.error(err)
                getCategoriesSubscription && getCategoriesSubscription.unsubscribe()
              })
          },
          err => {
            observer.error(err)
          })
    })
  }

  private _getCourseByCategoryIdForListOfCategories(listOfCategories, i) {
    // this.selectedCategoriesWithCourses = [];
    let coursesSubscription: Subscription;
    return new Promise((resolve, reject) => {
      let self = this;
      (function recursive() {
        if (i == listOfCategories.length) {
          coursesSubscription && coursesSubscription.unsubscribe();
          if (self.selectedCategoriesWithCourses.length) {
            resolve();
          } else {
            reject();
          }
        } else {
          // console.log(listOfCategories[i]);
          self.coursesDatabaseLayerProvider.getCoursesByCategoryId(listOfCategories[i].id)
            .then((courses: any) => {
              self.selectedCategoriesWithCourses.push({
                category: listOfCategories[i],
                courses: courses
              });

              // let header = {
              //   image: courses[i].image,
              //   name: courses[i].name,
              //   availability: courses[i].availability,
              //   categoryId: courses[i].categoryId,
              //   discountPrice: courses[i].discountPrice,
              //   originalPrice: courses[i].originalPrice,
              //   rating: courses[i].rating,
              //   trainingCenter: courses[i].trainingCenter,
              //   trainingCenterId: courses[i].trainingCenterId
              // };
              //
              // let clonedCourse = Object.assign({}, courses[i])

              // delete clonedCourse.image;
              // delete clonedCourse.name;
              // delete clonedCourse.availability;
              // delete clonedCourse.categoryId;
              // delete clonedCourse.discountPrice;
              // delete clonedCourse.originalPrice;
              // delete clonedCourse.name;
              // delete clonedCourse.rating;
              // delete clonedCourse.trainingCenter;
              // delete clonedCourse.trainingCenterId;

              // self.angularFireStore.collection('course-details').add(clonedCourse)
              //   .then((res) => {
              //     console.log(res);
              //     self.angularFireStore.collection('course-details').doc(res.id).update({
              //       id: res.id
              //     })
              //     self.angularFireStore.collection('course-header').doc(res.id).set(header)
              //       .then(() => {
              //         self.angularFireStore.collection('course-header').doc(res.id).update({
              //           id: res.id
              //         })
              //       })
              //
              //   });

              i++;
              recursive()
            })
        }
      })();
    });
  }


}

