import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest";
import {Subscription} from "rxjs";
import {MenuController} from 'ionic-angular';
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Keyboard} from "@ionic-native/keyboard";

// @IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage {
  categoriesCoursesSubscription: Subscription;
  categoriesCourses: any[];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private menuCtrl: MenuController, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private keyboard: Keyboard) {
  }

  ionViewDidLoad() {
    this.getCategoriesCourses();
  }

  ionViewWillUnload() {
    this.categoriesCoursesSubscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  getCategoriesCourses() {
    let loader = this.loadingCtrl.create(this.utilities.loaderOptions);
    loader.present().then(() => {
      this.categoriesCoursesSubscription = this.guestProvider.getCategoryWithCourses().subscribe((categoriesCourses) => {
          this.categoriesCourses = categoriesCourses;
          loader.dismiss();
        },
        err => {
          console.log(err);
          loader.dismiss();
        })
    })
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }
}
