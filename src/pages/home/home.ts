import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
// import {Router} from '@angular/router'
import { MenuController } from 'ionic-angular';

// import {SearchResultPage} from '../search-result/search-result'
import {InterestsPage} from "../interests/interests";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myInput: string;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController) {

  }

  onInput(text) {
    console.log(text);
    console.log(this.myInput)
  }

  onCancel(cancel) {
    console.log(cancel);
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

  routeToDetails() {
    // this.router.navigate(['/home/search']);
    this.navCtrl.push(InterestsPage);
  }
}
