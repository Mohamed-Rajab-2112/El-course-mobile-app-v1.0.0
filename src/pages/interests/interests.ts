import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {LoadingController} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {Storage} from '@ionic/storage';
// import {HomePage} from './../home/home'
import {LocationPage} from "../location/location";

@IonicPage()
@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})

export class InterestsPage {
  serverCategories: any[];
  userCategories: Category[] = [];
  footerStatus: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private category: CategoryProvider, public loadingCtrl: LoadingController, private database: DatabaseProvider, private storage: Storage) {
  }

  ionViewDidLoad() {
    /*init page variables*/
    this.userCategories = [];
    this.footerStatus = {display: 'none'};

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
            console.log(this.serverCategories);
          },
          (err) => {
            console.log(err);
          })
    });

    /*save the info of this is the first run*/
    this.storage.get('first run')
      .then((value) => {
        this.storage.set('first run', false);
      })
      .catch(() => {
        this.storage.set('first run', true);
      });
  }

  routeToLocation() {
    this.navCtrl.push(LocationPage);
  }

  /*add categories that user choose to a list without duplicate*/
  addToUserCategory(category) {
    this.userCategories.includes(category) ? this.userCategories.splice(this.userCategories.indexOf(category), 1) : this.userCategories.push(category);

    this.userCategories.length && (this.footerStatus = {display: 'block', bottom: '-50px'});

    setTimeout(() => {
      this.footerStatus = this.userCategories.length ? {bottom: '0'} : {bottom: '-50px'};
    }, 10);
  }

  /*submit the categories that user just choosed*/
  submitCategories() {
    this.database.insertUserCategories(this.userCategories)
      .then(() => {
        this.routeToLocation();
      }).catch(() => {
    });
    console.log(this.userCategories);
  }
}
