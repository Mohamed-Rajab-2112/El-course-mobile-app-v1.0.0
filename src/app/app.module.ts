import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {XsourceApp} from './app.component';

import {HttpModule} from '@angular/http';


import {HomePage} from '../pages/home/home';
import {InterestsPage} from '../pages/interests/interests';
import {SearchResultPage} from '../pages/search-result/search-result';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {InterestsPageModule} from "../pages/interests/interests.module";
import {CategoryProvider} from '../providers/category/category';
import {SQLite} from "@ionic-native/sqlite";
import { DatabaseProvider } from '../providers/database/database';

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
    InterestsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    XsourceApp,
    HomePage,
    InterestsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    SQLite,
    DatabaseProvider
  ]
})

export class AppModule {
  content = ['home']
}
