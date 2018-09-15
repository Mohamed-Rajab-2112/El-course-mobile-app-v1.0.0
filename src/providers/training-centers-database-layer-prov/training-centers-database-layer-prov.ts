import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFirestore} from "angularfire2/firestore";
import {UtilitiesProvider} from "../utilities/utilities.provider";

@Injectable()
export class TrainingCentersDatabaseLayerProvProvider {

  constructor(public http: Http, private angularFireStore: AngularFirestore, private utilitiesProvider: UtilitiesProvider) {
  }

  getAllTrainingCenters(limit = 10, lastTrainingCenter = null) {
    return new Promise((resolve, reject) => {
      let requestBodyRef: any = this.angularFireStore
        .collection('training-center-header').ref;

      if (lastTrainingCenter) {
        requestBodyRef(lastTrainingCenter).startAfter(lastTrainingCenter).limit(limit).get()
          .then((res) => {
            resolve(this.utilitiesProvider.convertFirebaseObjToRegularObject(res))
          })
          .catch((err) => reject(err))
      } else {
        requestBodyRef.limit(limit).get()
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
          // console.log(this.utilitiesProvider.convertFirebaseObjToRegularObject(trainingCenterDetails)[0]);
          resolve(this.utilitiesProvider.convertFirebaseObjToRegularObject(trainingCenterDetails)[0]);
        })
        .catch((err) => reject(err))
    })
  }

}
