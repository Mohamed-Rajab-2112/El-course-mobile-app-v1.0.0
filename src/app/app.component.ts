import {Component, ViewChild} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NativeStorage} from '@ionic-native/native-storage';
import {Nav} from 'ionic-angular';

import {HomePage} from '../pages/home/home';
import {InterestsPage} from '../pages/interests/interests';
// import {LocationPage} from '../pages/location/location';
// import {CountryModalPage} from '../pages/country-modal/country-modal';
import {AlertController} from 'ionic-angular';
import {DatabaseProvider} from "../providers/database/database";
import {AuthProvider} from "../providers/auth/auth";
import {GuestProvider} from "../providers/guest/guest";

// import {ModalController, NavParams} from 'ionic-angular';
import {UtilitiesProvider} from "../providers/utilities/utilities";
import {CategoriesPage} from "../pages/categories/categories";

@Component({
  templateUrl: 'app.html'
})
export class XsourceApp {
  rootPage: any;
  userType: string;
  languages: any[];
  countries: any[];
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private database: DatabaseProvider, private storage: NativeStorage, private auth: AuthProvider, private alertCtrl: AlertController, private guestProvider: GuestProvider, private utilitiesProvider: UtilitiesProvider) {
    platform.ready().then(() => {

      this.rootPage = CategoriesPage;

      /*subscribe to the root page to make it dynamic*/
      /*---------------------------------------------*/
      // this.utilitiesProvider.homePage.subscribe((homePageValue) => {
      //   this.rootPage = homePageValue;
      // });

      /*Register user first run flag*/
      /*----------------------------*/
      // this.storage.getItem('first run')
      //   .then((x) => {
      //     console.log(x);
      //     console.log('in then');
      //     this.utilitiesProvider.setHomePage(HomePage);
      //   })
      //   .catch(() => {
      //     console.log('in catch');
      //     this.utilitiesProvider.setHomePage(InterestsPage);
      //     this.storage.setItem('first run', false)
      //   });

      this.auth.userType.subscribe((userType) => {
          this.userType = userType;
        },
        err => {
          this.userType = 'guest';
        });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.database.initDb();
      statusBar.styleDefault();
      splashScreen.hide();
      // this.rootPage = LocationPage;
    });

    /*Get languages*/
    /*-------------*/
    // this.guestProvider.getLanguage().subscribe((languages) => {
    //   this.languages = [];
    //   languages.map((lang) => {
    //     this.languages.push({
    //       type: 'radio',
    //       value: lang.id,
    //       label: lang.name
    //     });
    //   })
    // });

    /*Get countries*/
    /*-------------*/
    // this.guestProvider.getCountries().subscribe((countries) => {
    //   this.countries = [];
    //   countries.map((country) => {
    //     this.countries.push({
    //       type: 'radio',
    //       value: country.id,
    //       label: country.name
    //     });
    //   })
    // })
  }

  /*routing functions*/
  /*=================*/

  routeToHome() {
    this.nav.popToRoot(HomePage);
  }

  // routeToCategories() {
  //   // console.log('route to categories');
  //   this.nav.push(CategoriesPage);
  // }

  /*prompt for choosing country*/
  /*===========================*/

  // promptChooseCountry() {
  //   console.log('country prompt');
  //   this.storage.getItem('countryId')
  //     .then((val) => {
  //       this.countries.map((country) => {
  //         country.checked = country.value === val;
  //       })
  //     })
  //     .catch(() => {
  //       console.log('the first time to choose country')
  //     }).then(() => {
  //     let alert = this.alertCtrl.create({
  //       title: "Choose Country",
  //       message: "Please choose your preferred country",
  //       inputs: this.countries,
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel'
  //         },
  //         {
  //           text: 'Submit',
  //           handler: (data) => {
  //             this.storage.setItem('countryId', data);
  //             this.nav.popToRoot();
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   });
  // }

  /*prompt for choosing language*/
  /*============================*/

  // promptChooseLanguage() {
  //   console.log('language prompt');
  //   this.storage.getItem('languageId')
  //     .then((val) => {
  //       this.languages.map((lang) => {
  //         console.log(lang.value);
  //         console.log(val);
  //         lang.checked = lang.value === val;
  //       })
  //     })
  //     .catch(() => {
  //       console.log('the first time to choose lang')
  //     }).then(() => {
  //     let alert = this.alertCtrl.create({
  //       title: "Choose Language",
  //       message: "Please choose your preferred language",
  //       inputs: this.languages,
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel'
  //         },
  //         {
  //           text: 'Submit',
  //           handler: (data) => {
  //             this.storage.setItem('languageId', data);
  //             this.nav.popToRoot();
  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   });
  //
  // }
}
