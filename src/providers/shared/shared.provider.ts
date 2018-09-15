import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url.provider";
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
// import {Subject} from "rxjs/Subject";

@Injectable()
export class SharedProvider {
  connectioStatus = new BehaviorSubject(false);

  constructor(public http: Http, private apiUrl: ApiUrlProvider, private angularFireStore: AngularFirestore, private realtimeDatabase: AngularFireDatabase) {
  }

  getCategories() {
    return Observable.create((observer) => {
      this.angularFireStore.collection('categories').valueChanges()
        .subscribe((categories) => {
            observer.next(categories)
          },
          err => {
            observer.error(err)
          })
    })
  }

  setConnectionStatus(status) {
    this.connectioStatus.next(status);
  }

  checkConnection() {
    const self = this;
    this.realtimeDatabase.database.ref('.info/connected').on('value', function (snapshot) {
      // If we're not currently connected, don't do anything.
      console.log(snapshot.val());
      self.setConnectionStatus(snapshot.val());
    })
  }

}
