import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFirestore} from "angularfire2/firestore";
import {UtilitiesProvider} from "../utilities/utilities.provider";
import {SharedProvider} from "../shared/shared.provider";

@Injectable()
export class TrainingCentersDatabaseLayerProvProvider {

  constructor(public http: Http, private angularFireStore: AngularFirestore, private utilitiesProvider: UtilitiesProvider, private sharedProvider: SharedProvider) {
  }

  getAllTrainingCenters(lastLoadedTrainingCenter?, limit = 4) {
    return new Promise((resolve, reject) => {
      let requestBodyRef: any = this.angularFireStore
        .collection('training-center-header').ref;
      console.log(lastLoadedTrainingCenter);
      if (lastLoadedTrainingCenter) {
        requestBodyRef.orderBy('id', 'asc').startAfter(lastLoadedTrainingCenter.id).limit(limit).get()
          .then((res) => {
            resolve(this.utilitiesProvider.convertFirebaseObjToRegularObject(res))
          })
          .catch((err) => reject(err))
      } else {
        requestBodyRef.orderBy('id', 'asc').limit(limit).get()
          .then((res) => {
            console.log(res);
            resolve(this.utilitiesProvider.convertFirebaseObjToRegularObject(res))
          })
          .catch((err) => reject(err))
      }
    });
  }

  getTrainingCenterDetailsById(trainingCenterId) {
    return new Promise((resolve, reject) => {
      this.angularFireStore
        .collection('training-center-details').ref
        .where('id', '==', trainingCenterId
        ).get()
        .then((trainingCenterDetails) => {
          resolve(this.utilitiesProvider.convertFirebaseObjToRegularObject(trainingCenterDetails)[0]);
        })
        .catch((err) => reject(err))
    })
  }

  getCoursesByTrainingCenterId(trainingCenterId) {
    return new Promise((resolve, reject) => {
      console.log(trainingCenterId);
      this.angularFireStore.collection('course-header').ref
        .where('trainingCenterId', '==', trainingCenterId)
        .get()
        .then((courses) => {
          let selectedCoursesWithCategories: any[] = [];
          let coursesConverted = this.utilitiesProvider.convertFirebaseObjToRegularObject(courses);
          console.log(coursesConverted);

          coursesConverted.forEach((newCourse) => {
            if (!selectedCoursesWithCategories.length) {
              selectedCoursesWithCategories.push({
                category: {
                  id: newCourse.categoryId
                },
                courses: [
                  newCourse
                ]
              });
            } else {
              selectedCoursesWithCategories.forEach((courseWithCategory, i) => {
                if (newCourse.categoryId == courseWithCategory.category.id) {
                  courseWithCategory.courses.push(newCourse)
                } else {
                  if (selectedCoursesWithCategories.length - 1 == i) {
                    selectedCoursesWithCategories.push({
                      category: {
                        id: newCourse.categoryId
                      },
                      courses: [
                        newCourse
                      ]
                    })
                  }
                }
              })
            }
          });
          console.log(selectedCoursesWithCategories);
          this.sharedProvider.getCategories()
            .subscribe((categories) => {
              selectedCoursesWithCategories.forEach(element => {
                categories.forEach(singleCategory => {
                  if (element.category.id == singleCategory.id) {
                    element.category = singleCategory
                  }
                })
              });
              resolve(selectedCoursesWithCategories)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

}
