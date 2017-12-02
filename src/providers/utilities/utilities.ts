import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import {InterestsPage} from "../../pages/interests/interests";


@Injectable()
export class UtilitiesProvider {
  homePage = new BehaviorSubject<any>(InterestsPage);

  constructor(public http: Http) {
  }

  setHomePage(value) {
    this.homePage.next(value)
  }

}
