import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, LoadingController, Content} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest.provider";
import {TrainingCenterDetailsPage} from "../training-center-details/training-center-details.page";
import {Subscription} from "rxjs/Subscription";
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {TrainingCenterProvProvider} from "../../providers/training-center-prov/training-center-prov";

@IonicPage()
@Component({
  selector: 'page-training-centers',
  templateUrl: 'training-centers.page.html',
})

export class TrainingCentersPage {
  trainingCenters: any[];
  getAllCentersSubscription: Subscription;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private trainingCenterProvider: TrainingCenterProvProvider, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider) {
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
    this.utilities.showLoading()
    // .then(() => {
    this.getAllCentersSubscription = this.trainingCenterProvider.getAllTrainingCenters().subscribe((trainingCenters) => {
        console.log(trainingCenters);
        this.trainingCenters = trainingCenters;
        this.utilities.hideLoading();
      },
      err => {
        console.log(err);
        this.utilities.hideLoading()
      })
    // })
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
