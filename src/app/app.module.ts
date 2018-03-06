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
import {Geolocation} from '@ionic-native/geolocation';
import {Keyboard} from '@ionic-native/keyboard';
import {GooglePlus} from '@ionic-native/google-plus';

/*pipes*/
import {PipesModule} from '../pipes/pipes.module';
import {UtilitiesProvider} from '../providers/utilities/utilities';
import {ManuallyLocationPage} from "../pages/manually-location/manually-location";
import {ManuallyLocationPageModule} from "../pages/manually-location/manually-location.module";
import {StudentProvider} from '../providers/student/student';
import {ApiUrlProvider} from '../providers/api-url/api-url';
import {GuestProvider} from '../providers/guest/guest';

import {AuthProvider} from '../providers/auth/auth';

import {NativeStorage} from '@ionic-native/native-storage';
import {TrainingCentersPageModule} from "../pages/training-centers/training-centers.module";
import {TrainingCenterDetailsPageModule} from "../pages/training-center-details/training-center-details.module";
import {CategoriesPage} from "../pages/categories/categories";
import {ComponentsModule} from "../components/components.module";
import {QuestionsPageModule} from "../pages/questions/questions.module";
// import {SignInPage} from "../pages/sign-in/sign-in";
import {SignInPageModule} from "../pages/sign-in/sign-in.module";
import {Facebook} from '@ionic-native/facebook'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SignUpPageModule} from "../pages/sign-up/sign-up.module";

export const firebaseConfig = {
  apiKey: "AIzaSyDYrrCt5GObIKP_IZ3rQSrDtfjoEtx9mrc",
  authDomain: "xsource-a0e3f.firebaseapp.com",
  databaseURL: "https://xsource-a0e3f.firebaseio.com",
  projectId: "xsource-a0e3f",
  storageBucket: "xsource-a0e3f.appspot.com",
  messagingSenderId: "60593959366"
};

@NgModule({
  declarations: [
    XsourceApp,
    // HomePage,
    SearchResultPage,
    CategoriesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(XsourceApp, {
      scrollAssist: false,
      autoFocusAssist: false,
      // pageTransition: 'ios-transition'
    }),
    HttpModule,
    InterestsPageModule,
    PipesModule,
    LocationPageModule,
    SignUpPageModule,
    ManuallyLocationPageModule,
    TrainingCentersPageModule,
    ComponentsModule,
    TrainingCenterDetailsPageModule,
    QuestionsPageModule,
    SignInPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    XsourceApp,
    // HomePage,
    CategoriesPage,
    InterestsPage,
    LocationPage,
    ManuallyLocationPage,
    // CategoriesPage
  ],
  providers: [
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryProvider,
    SQLite,
    Geolocation,
    DatabaseProvider,
    UtilitiesProvider,
    StudentProvider,
    ApiUrlProvider,
    GuestProvider,
    AuthProvider,
    NativeStorage,
    Keyboard
  ]
})

export class AppModule {
  content = ['home']
}
