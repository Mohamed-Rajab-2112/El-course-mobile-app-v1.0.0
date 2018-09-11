import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home.page";

@IonicPage()
@Component({
  selector: 'page-manually-location',
  templateUrl: 'manually-location.html',
})
export class ManuallyLocationPage {
  city: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManuallyLocationPage');
  }


  submitLocation(location) {
    console.log(location);
    this.routeToHome()
  }

  routeToHome() {
    this.navCtrl.popToRoot(HomePage);
  }
}
