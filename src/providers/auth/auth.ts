import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";


@Injectable()
export class AuthProvider {
  userType = new BehaviorSubject<string>('guest');

  constructor(public http: Http) {

  }

  setUserType(value) {
    this.userType.next(value)
  }



}
