import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {LoadingController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})

export class InterestsPage {
  serverCategories: Category[];
  userCategories: Category[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private category: CategoryProvider, public loadingCtrl: LoadingController, private database: DatabaseProvider) {
  }

  ionViewDidLoad() {
    /*init page variables*/
    this.userCategories = [];

    /*define loader*/
    let loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: "Please wait..."
    });

    /*call loader and get categories in its success*/
    loader.present().then(() => {
      this.category.getCategories()
        .subscribe((response) => {
            this.serverCategories = response.categories;
            loader.dismiss();
            console.log(this.serverCategories)
          },
          (err) => {
            console.log(err);
          })
    });
  }

  addToUserCategory(category) {
    this.userCategories.includes(category) ? this.userCategories.splice(this.userCategories.indexOf(category), 1) : this.userCategories.push(category);
  }

  toggleFooter() {
    console.log(this.userCategories.length);
    return this.userCategories.length ? {bottom: '0'} : {bottom: '-50px'}
  }

  /*submit the categories that user just choosed*/
  submitCategories() {
    this.database.insertUserCategories(this.userCategories);
    console.log(this.userCategories);
  }
}
