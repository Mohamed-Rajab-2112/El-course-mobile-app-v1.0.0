import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';

import {HomePage} from '../pages/home/home';
import {InterestsPage} from '../pages/interests/interests';
import {LocationPage} from '../pages/location/location';
import {DatabaseProvider} from "../providers/database/database";

@Component({
  templateUrl: 'app.html'
})
export class XsourceApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private database: DatabaseProvider, private storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('first run')
        .then((value) => {
          value == null && (value = true);
          // alert('first run = ' + value);
          // alert(typeof value);
          if (value) {
            // this.rootPage = InterestsPage;
            this.storage.set('first run', false);
          } else {
            // this.rootPage = HomePage;
          }
        })
        .catch(() => {
          alert("first run doesn't registered");
        });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.database.initDb();
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = LocationPage;

    });
  }
}
