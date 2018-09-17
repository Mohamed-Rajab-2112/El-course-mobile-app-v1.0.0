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
  connectionStatus = new BehaviorSubject(true);
  categories = new BehaviorSubject(null);
  counts = new BehaviorSubject(null);

  constructor(public http: Http, private apiUrl: ApiUrlProvider, private angularFireStore: AngularFirestore, private realtimeDatabase: AngularFireDatabase) {
  }

  getCategories() {
    return Observable.create((observer) => {
      const categoriesSubscription = this.categories
        .subscribe((categories) => {
          if (categories) {
            observer.next(categories);
            categoriesSubscription && categoriesSubscription.unsubscribe();
          } else {
            this.angularFireStore.collection('categories', ref => ref.orderBy('name', 'desc')).valueChanges()
              .subscribe((categories) => {
                  this.categories.next(categories);
                },
                err => {
                  observer.error(err)
                })
          }
        });
    })
  }

  setConnectionStatus(status) {
    this.connectionStatus.next(status);
  }

  checkConnection() {
    const self = this;
    this.realtimeDatabase.database.ref('.info/connected').on('value', function (snapshot) {
      // If we're not currently connected, don't do anything.
      console.log(snapshot.val());
      self.setConnectionStatus(snapshot.val());
    })
  }

  setCounts(value) {
    console.log(value);
    this.counts.next(value);
  }

  getCounts() {
    this.angularFireStore.collection('counts').ref.onSnapshot(snapshot => {
      // console.log(snapshot);
      snapshot.forEach((ele) => {
        console.log(ele.data());
        this.setCounts(ele.data());
      })
    })
  }

}
