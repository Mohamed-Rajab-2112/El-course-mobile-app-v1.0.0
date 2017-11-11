import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
// import {Router} from '@angular/router'

// import {SearchResultPage} from '../search-result/search-result'
import {InterestsPage} from "../interests/interests";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myInput: string;

  constructor(public navCtrl: NavController) {

  }

  onInput(text) {
    console.log(text);
    console.log(this.myInput)
  }

  onCancel(cancel) {
    console.log(cancel);
  }

  routeToDetails() {
    // this.router.navigate(['/home/search']);
    this.navCtrl.push(InterestsPage);
  }
}
