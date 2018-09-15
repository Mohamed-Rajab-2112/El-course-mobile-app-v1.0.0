import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFirestore} from "angularfire2/firestore";

@Injectable()
export class CoursesDatabaseLayerProvProvider {

  constructor(public http: Http, private angularFireStore: AngularFirestore) {
  }

  getCoursesByCategoryId(categoryId) {
    return new Promise((resolve, reject) => {
      this.angularFireStore
        .collection('course-header', ref => ref.where('categoryId', '==', categoryId).orderBy('createdDate', 'desc').limit(10))
        .valueChanges()
        .subscribe(
          querySnapshot => resolve(querySnapshot),
          err => reject(err)
        )
    })
  }

  createCourse(courseDetails) {
    this.angularFireStore.collection('course-details').add(courseDetails)
      .then((res) => {
        console.log(res);
        this.angularFireStore.collection('course-details').doc(res.id).update({
          id: res.id
        })
        this.angularFireStore.collection('course-header').doc(res.id).set(courseDetails)
          .then(() => {
            this.angularFireStore.collection('course-header').doc(res.id).update({
              id: res.id
            })
          })

      });
  }

}
