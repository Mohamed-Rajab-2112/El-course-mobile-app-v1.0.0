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
  countSubscription: Subscription;
  categoriesCount: number;
  categoriesCourses: any[] = [];
  @ViewChild(Content) content: Content;
  networkStatus: boolean = true;
  networkStatusView: boolean = true;
  disableRetryBtn: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private menuCtrl: MenuController, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private categoriesProvider: CategoriesProvider, private sharedProvider: SharedProvider) {
    this.utilities.pageHasError = CategoriesPage;
  }

  ionViewDidLoad() {
    this.sharedProvider.checkConnection();
    this.utilities.showLoading();
    this.subscribeToCounts();
    this.getCategoriesCourses()
      .catch(() => {
        this.networkStatusView = false;
      })
  }

  ionViewWillLeave() {
    // console.log('leave');
    this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
    this.connectionStatusSubscription && this.connectionStatusSubscription.unsubscribe();

    this.content.scrollToTop();
  }

  ionViewWillEnter() {
    this.subscribeToNetworkStatus();
    this.content.resize();
  }


  subscribeToCounts() {
    this.countSubscription = this.sharedProvider.counts
      .subscribe((counts) => {
        if (counts) {
          this.categoriesCount = counts.categoriesCount;
        }
      })
  }

  subscribeToNetworkStatus() {
    setTimeout(() => {
      this.connectionStatusSubscription = this.sharedProvider.connectionStatus
        .subscribe((networkStatus) => {
          console.log(networkStatus);
          this.networkStatus = networkStatus;
        });
    }, 1000)
  }

  getCategoriesCourses() {
    console.log('getting');
    return new Promise((resolve, reject) => {
      this.categoriesCoursesSubscription = this.categoriesProvider.getCategoryWithCourses()
        .subscribe((categoriesCourses) => {
            this.categoriesCourses = categoriesCourses;
            this.utilities.hideLoading();
            this.disableRetryBtn = false;
            this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
            resolve();
          },
          err => {
            console.log(err);
            this.utilities.hideLoading();
            this.disableRetryBtn = false;
            this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
            reject();
          })
    });
  }

  reConnect() {
    if (this.networkStatus) {
      this.disableRetryBtn = true;
      this.getCategoriesCourses()
        .then(() => {
          this.networkStatusView = true;
        })
    }
  }

  loadMore(e) {
    console.log(e);
    this.networkStatus && this.getCategoriesCourses()
      .then(() => {
        e.complete();
        if (this.categoriesCourses.length == this.categoriesCount) {
          e.enable(false);
        }
      })
  }

  routeToCategoryDetails() {
    this.navCtrl.push('CategoryDetailsPage');
  }

  openMenu() {
    this.menuCtrl.toggle();
  }


}
