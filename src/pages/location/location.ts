import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import {ManuallyLocationPage} from "../manually-location/manually-location";
import {Geolocation} from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  routeToHome() {
    this.navCtrl.push(HomePage);
  }

  activateGPS() {
    Geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      alert(JSON.stringify(resp));
      alert('success');
    }).catch((error) => {
      alert('Error getting location' + error.message);
      alert('Error getting location' + error.code);
    });
  }

  routeToManuallyLocation() {
    this.navCtrl.push(ManuallyLocationPage);
  }
}
