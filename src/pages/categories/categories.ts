import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest";
import {Subscription} from "rxjs";
import {MenuController} from 'ionic-angular';
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {CategoryDetailsPage} from "../category-details/category-details";

// import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage {
  categoriesCoursesSubscription: Subscription;
  categoriesCourses: any[];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private menuCtrl: MenuController, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    this.utilities.showLoading().then(() => {
      this.getCategoriesCourses();
    })
  }

  ionViewWillUnload() {
    this.categoriesCoursesSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  getCategoriesCourses() {
    this.categoriesCoursesSubscription = this.guestProvider.getCategoryWithCourses().subscribe((categoriesCourses) => {
        this.categoriesCourses = categoriesCourses;
        this.utilities.hideLoading();
      },
      err => {
        console.log(err);
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
