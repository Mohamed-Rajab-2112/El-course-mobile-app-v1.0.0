import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, LoadingController, Content} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest";
import {TrainingCenterDetailsPage} from "../training-center-details/training-center-details";
import {Subscription} from "rxjs/Subscription";
import {UtilitiesProvider} from "../../providers/utilities/utilities";

@IonicPage()
@Component({
  selector: 'page-training-centers',
  templateUrl: 'training-centers.html',
})

export class TrainingCentersPage {
  trainingCenters: any[];
  getAllCentersSubscription: Subscription;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private guestProvider: GuestProvider, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingCentersPage');
    this.getAllCenters();
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  getAllCenters() {
    // let loader = this.loadingCtrl.create(this.utilities.loaderOptions);
    this.utilities.showLoading().then(() => {
      this.getAllCentersSubscription = this.guestProvider.getTrainingCenters().subscribe((trainingCenters) => {
          this.trainingCenters = trainingCenters;
          this.utilities.hideLoading();
        },
        err => {
          console.log(err);
          this.utilities.hideLoading()
        })
    })
  }

  ionViewWillUnload() {
    this.getAllCentersSubscription.unsubscribe();
  }

  routeToTrainingCenterDetails($event, id) {
    this.navCtrl.push('TrainingCenterDetailsPage', id)
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }

}
