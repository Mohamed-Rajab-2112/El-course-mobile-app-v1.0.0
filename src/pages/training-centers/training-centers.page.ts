import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController, LoadingController, Content} from 'ionic-angular';
import {TrainingCenterDetailsPage} from "../training-center-details/training-center-details.page";
import {Subscription} from "rxjs/Subscription";
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {TrainingCenterProvProvider} from "../../providers/training-center-prov/training-center-prov";
import {SharedProvider} from "../../providers/shared/shared.provider";

@IonicPage()
@Component({
  selector: 'page-training-centers',
  templateUrl: 'training-centers.page.html',
})

export class TrainingCentersPage {
  trainingCenters: any[] = [];
  getAllCentersSubscription: Subscription;
  countsSubscription: Subscription;
  networkStatus: boolean;
  @ViewChild(Content) content: Content;
  totalTrainingCentersCount: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private trainingCenterProvider: TrainingCenterProvProvider, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private sharedProvider: SharedProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingCentersPage');
    this.networkStatus = this.sharedProvider.connectionStatus.value;
    if (this.networkStatus) {
      this.utilities.showLoading();
      this.subscribeToCounts();
      this.getAllCenters();
    }
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  ionViewWillUnload() {
    this.getAllCentersSubscription && this.getAllCentersSubscription.unsubscribe();
    this.countsSubscription && this.countsSubscription.unsubscribe();
  }

  getAllCenters(lastLoadedTrainingCenter?) {
    return new Promise((resolve, reject) => {
      this.getAllCentersSubscription = this.trainingCenterProvider.getAllTrainingCenters(lastLoadedTrainingCenter)
        .subscribe((trainingCenters) => {
            console.log(trainingCenters);
            this.trainingCenters = this.trainingCenters.concat(trainingCenters);
            this.utilities.hideLoading();
            this.getAllCentersSubscription && this.getAllCentersSubscription.unsubscribe();
            resolve();
          },
          err => {
            console.log(err);
            this.utilities.hideLoading();
            this.networkStatus = false;
            this.getAllCentersSubscription && this.getAllCentersSubscription.unsubscribe();
            reject();
          })
    })
  }

  subscribeToCounts() {
    this.countsSubscription = this.sharedProvider.counts
      .subscribe((counts) => {
        console.log(counts.trainingCentersCount);
        this.totalTrainingCentersCount = counts.trainingCentersCount;
      })
  }

  routeToTrainingCenterDetails($event, id) {
    this.navCtrl.push('TrainingCenterDetailsPage', id)
  }

  loadMore(e) {
    let lastLoadedTrainingCenter = this.trainingCenters[this.trainingCenters.length - 1];
    this.networkStatus && this.getAllCenters(lastLoadedTrainingCenter)
      .then(() => {
        e.complete();
        console.log(this.totalTrainingCentersCount);
        if (this.trainingCenters.length == this.totalTrainingCentersCount) {
          e.enable(false);
        }
      })
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }

}
