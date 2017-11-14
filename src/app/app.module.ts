import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {XsourceApp} from './app.component';

import {HttpModule} from '@angular/http';

import {HomePage} from '../pages/home/home';
import {InterestsPage} from '../pages/interests/interests';
import {LocationPage} from '../pages/location/location';
import {SearchResultPage} from '../pages/search-result/search-result';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {InterestsPageModule} from "../pages/interests/interests.module";
import {LocationPageModule} from "../pages/location/location.module";
import {CategoryProvider} from '../providers/category/category';
import {SQLite} from "@ionic-native/sqlite";
import {DatabaseProvider} from '../providers/database/database';

import {IonicStorageModule} from '@ionic/storage';
// import {Geolocation} from '@ionic-native/geolocation';

/*pipes*/
import {PipesModule} from '../pipes/pipes.module';
import {UtilitiesProvider} from '../providers/utilities/utilities';
import {ManuallyLocationPage} from "../pages/manually-location/manually-location";
import {ManuallyLocationPageModule} from "../pages/manually-location/manually-location.module";

@NgModule({
  declarations: [
    XsourceApp,
    HomePage,
    SearchResultPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(XsourceApp),
    HttpModule,
    InterestsPageModule,
    PipesModule,
    LocationPageModule,
    ManuallyLocationPageModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    XsourceApp,
    HomePage,
    InterestsPage,
    LocationPage,
    ManuallyLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    SQLite,
    // Geolocation,
    DatabaseProvider,
    UtilitiesProvider
  ]
})

export class AppModule {
  content = ['home']
}
