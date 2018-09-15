import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest.provider";
import {Subscription} from "rxjs";
import {MenuController} from 'ionic-angular';
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {CategoryDetailsPage} from "../category-details/category-details.page";
import {CategoriesProvider} from "../../providers/categories/categories.provider";
import {SharedProvider} from "../../providers/shared/shared.provider";

// import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.page.html',
})

export class CategoriesPage {
  categoriesCoursesSubscription: Subscription;
  connectionStatusSubscription: Subscription;
  categoriesCourses: any[];
  @ViewChild(Content) content: Content;
  toggleNetworkError: boolean;
  disableRetryBtn: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private menuCtrl: MenuController, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private categoriesProvider: CategoriesProvider, private sharedProvider: SharedProvider) {
    this.utilities.pageHasError = CategoriesPage;
  }

  ionViewDidLoad() {
    // this.utilities.showLoading();
    this.getCategoriesCourses();
  }

  ionViewWillUnload() {
    this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
    this.connectionStatusSubscription && this.connectionStatusSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  subscribeToConnectionStatus() {
    // this.connectionStatusSubscription && this.connectionStatusSubscription.unsubscribe();
    // this.connectionStatusSubscription = this.sharedProvider.connectioStatus
    //   .subscribe((status) => {
    //     console.log(status);
    //     if (status) {
    //       // this.utilities.showLoading();
    //       // this.getCategoriesCourses();
    //       // this.toggleNetworkError = false;
    //       // this.connectionStatusSubscription && this.connectionStatusSubscription.unsubscribe();
    //     }
    //   });
  }

  getCategoriesCourses() {
    console.log('getting');
    this.disableRetryBtn = true;
    // this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
    this.categoriesCoursesSubscription = this.categoriesProvider.getCategoryWithCourses()
      .subscribe((categoriesCourses) => {
          // alert(JSON.stringify(categoriesCourses, null, 3))
        console.log(categoriesCourses);
          this.categoriesCourses = categoriesCourses;
          // this.utilities.hideLoading();
          this.toggleNetworkError = false;
          this.disableRetryBtn = false;
          this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
        },
        err => {
          console.log(err);
          // this.utilities.showAlert('Error', err.message);
          // alert('error')
          this.subscribeToConnectionStatus();
          this.utilities.hideLoading();
          this.toggleNetworkError = true;
          this.disableRetryBtn = false;
          this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
        })
  }

  routeToCategoryDetails() {
    this.navCtrl.push('CategoryDetailsPage');
  }

  openMenu() {
    this.menuCtrl.toggle();
  }


}
