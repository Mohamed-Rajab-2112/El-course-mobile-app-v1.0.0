import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest.provider";
import {Subscription} from "rxjs";
import {MenuController} from 'ionic-angular';
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {CategoryDetailsPage} from "../category-details/category-details.page";
import {CategoriesProvider} from "../../providers/categories/categories.provider";

// import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.page.html',
})

export class CategoriesPage {
  categoriesCoursesSubscription: Subscription;
  categoriesCourses: any[];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private menuCtrl: MenuController, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private categoriesProvider: CategoriesProvider) {
  }

  ionViewDidLoad() {
    this.utilities.showLoading();
    // .then(() => {
    this.getCategoriesCourses();
    // })
  }

  ionViewWillUnload() {
    this.categoriesCoursesSubscription && this.categoriesCoursesSubscription.unsubscribe();
  }


  ionViewWillEnter() {
    this.content.resize();
  }

  getCategoriesCourses() {
    this.categoriesCoursesSubscription = this.categoriesProvider.getCategoryWithCourses()
      .subscribe((categoriesCourses) => {
          // alert(JSON.stringify(categoriesCourses, null, 3))
          this.categoriesCourses = categoriesCourses;
          this.utilities.hideLoading();
        },
        err => {
          console.log(err);
          this.utilities.showAlert('Error', err.message);
          this.utilities.hideLoading();
        })
  }

  routeToCategoryDetails() {
    this.navCtrl.push('CategoryDetailsPage');
  }

  openMenu() {
    this.menuCtrl.toggle();
  }
}