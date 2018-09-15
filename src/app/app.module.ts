import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {XsourceApp} from './app.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
import {Keyboard} from '@ionic-native/keyboard';
import {GooglePlus} from '@ionic-native/google-plus';
import {PipesModule} from '../pipes/pipes.module';
import {UtilitiesProvider} from '../providers/utilities/utilities.provider';
import {StudentProvider} from '../providers/student/student.provider';
import {ApiUrlProvider} from '../providers/api-url/api-url.provider';
import {GuestProvider} from '../providers/guest/guest.provider';
import {AuthProvider} from '../providers/auth/auth.provider';
import {NativeStorage} from '@ionic-native/native-storage';
import {Facebook} from '@ionic-native/facebook'
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SharedProvider} from '../providers/shared/shared.provider';
import {CategoriesProvider} from '../providers/categories/categories.provider';
import {CategoriesDatabaseLayerProvider} from '../providers/categories-database-layer/categories-database-layer';
import {CategoriesPageModule} from "../pages/categories/categories.page.module";
import {ComponentsModule} from "../components/components.module";
import {HttpInterceptorProvider} from '../providers/http-interceptor/http-interceptor';
import {CoursesProvProvider} from '../providers/courses-prov/courses-prov';
import { TrainingCenterProvProvider } from '../providers/training-center-prov/training-center-prov';
import { CoursesDatabaseLayerProvProvider } from '../providers/courses-database-layer-prov/courses-database-layer-prov';
import { TrainingCentersDatabaseLayerProvProvider } from '../providers/training-centers-database-layer-prov/training-centers-database-layer-prov';

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
    // CategoriesPage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    IonicModule.forRoot(XsourceApp, {
      scrollAssist: false,
      autoFocusAssist: false,
    }),
    HttpModule,
    HttpClientModule,
    PipesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    CategoriesPageModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    XsourceApp,
    // CategoriesPage
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
    CategoriesDatabaseLayerProvider,
    HttpInterceptorProvider,
    CoursesProvProvider,
    TrainingCenterProvProvider,
    CoursesDatabaseLayerProvProvider,
    TrainingCentersDatabaseLayerProvProvider
  ]
})

export class AppModule {
  content = ['home']
}
