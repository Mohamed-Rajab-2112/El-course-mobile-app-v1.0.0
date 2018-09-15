import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {TrainingCentersDatabaseLayerProvProvider} from "../training-centers-database-layer-prov/training-centers-database-layer-prov";
import {Observable} from "rxjs/Observable";

@Injectable()

export class TrainingCenterProvProvider {

  constructor(public http: Http, private trainingCenterDatabaseLayer: TrainingCentersDatabaseLayerProvProvider) {
  }

  getAllTrainingCenters() {
    return Observable.create((observer) => {
      this.trainingCenterDatabaseLayer.getAllTrainingCenters()
        .then((trainingCenters) => {
            observer.next(trainingCenters)
          },
          err => {
            observer.error(err)
          })
    })
  }

  getTrainingCenterDetailsById(trainingCenterId) {
    return Observable.create((observer) => {
      this.trainingCenterDatabaseLayer.getTrainingCenterDetailsById(trainingCenterId)
        .then((trainingCenterDetails) => {
            console.log(trainingCenterDetails);
            observer.next(trainingCenterDetails)
          },
          err => {
            observer.error(err)
          })
    })
  }

}
