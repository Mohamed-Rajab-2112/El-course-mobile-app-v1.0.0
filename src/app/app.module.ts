import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {XsourceApp} from './app.component';
import {HttpModule} from '@angular/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SQLite} from "@ionic-native/sqlite";
import {DatabaseProvider} from '../providers/database/database';
import {IonicStorageModule} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation';
import {Keyboard} from '@ionic-native/keyboard';
import {GooglePlus} from '@ionic-native/google-plus';

/*pipes*/
import {PipesModule} from '../pipes/pipes.module';
import {UtilitiesProvider} from '../providers/utilities/utilities';
import {StudentProvider} from '../providers/student/student';
import {ApiUrlProvider} from '../providers/api-url/api-url';
import {GuestProvider} from '../providers/guest/guest';
import {AuthProvider} from '../providers/auth/auth';
import {NativeStorage} from '@ionic-native/native-storage';
import {Facebook} from '@ionic-native/facebook'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SharedProvider} from '../providers/shared/shared';
import {CategoriesProvider} from '../providers/categories/categories';
import {CategoriesDatabaseLayerProvider} from '../providers/categories-database-layer/categories-database-layer';

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
    XsourceApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(XsourceApp, {
      scrollAssist: false,
      autoFocusAssist: false,
    }),
    HttpModule,
    PipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    XsourceApp,
  ],
  providers: [
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // SQLite,
    // Geolocation,
    // DatabaseProvider,
    UtilitiesProvider,
    StudentProvider,
    ApiUrlProvider,
    GuestProvider,
    AuthProvider,
    NativeStorage,
    Keyboard,
    SharedProvider,
    CategoriesProvider,
    CategoriesDatabaseLayerProvider
  ]
})

export class AppModule {
  content = ['home']
}
