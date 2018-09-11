import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiUrlProvider} from "../api-url/api-url.provider";
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SharedProvider {

  constructor(public http: Http, private apiUrl: ApiUrlProvider, private angularFireStore: AngularFirestore) {
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

}
