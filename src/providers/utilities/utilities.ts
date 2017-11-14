import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilitiesProvider {



  constructor(public http: Http) {
  }

}
