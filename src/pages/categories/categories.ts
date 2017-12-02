import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest";
import {Subscription} from "rxjs";
import {MenuController} from 'ionic-angular';

// @IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})

export class CategoriesPage {
  categoriesCoursesSubscription: Subscription;
  categoriesCourses: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    this.categoriesCoursesSubscription = this.guestProvider.getCategoryWithCourses().subscribe((categoriesCourses) => {
        this.categoriesCourses = categoriesCourses;
      },
      err => {
        console.log(err);
      })
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }


}
