import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest";
import {Subscription} from "rxjs/Subscription";
import {QuestionsPage} from "../questions/questions";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {Keyboard} from "@ionic-native/keyboard";
import {AuthProvider} from "../../providers/auth/auth";
import {SignInPage} from "../sign-in/sign-in";

@IonicPage()
@Component({
  selector: 'page-training-center-details',
  templateUrl: 'training-center-details.html',
})
export class TrainingCenterDetailsPage {
  trainingCenterDetails: any = {};
  getTrainingCenterByIdSubscribtion: Subscription;
  // userTypeSubscriptionthis: Subscription;
  userType: string;
  showAskQuestion: boolean;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, public loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    this.getTrainingCenterDetails();
    this.userType = this.auth.userType.value;
    this.showAskQuestion = this.userType == 'guest' || this.userType == 'student';
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  ionViewWillUnload() {
    this.getTrainingCenterByIdSubscribtion.unsubscribe();
  }

  getTrainingCenterDetails() {
    this.trainingCenterDetails = {};
    let loader = this.loadingCtrl.create(this.utilities.loaderOptions);
    loader.present().then(() => {
      this.getTrainingCenterByIdSubscribtion = this.guestProvider.getTrainingCenterById(this.navParams.data).subscribe((trainingCenterDetails) => {
          this.trainingCenterDetails = trainingCenterDetails;
          loader.dismiss();
        },
        err => {
          loader.dismiss();
        });
    });
  }

  routeToQuestions($event) {
    if (this.userType == 'student') {
      this.navCtrl.push(QuestionsPage, this.trainingCenterDetails.id);
    } else if (this.userType == 'guest') {
      this.utilities.showAlert("Can't Ask", "Please Sign in first to ask questions.", "prompt", 'Sign In', 'Cancel')
        .then(() => {
          this.navCtrl.push(SignInPage);
        })
        .catch(() => {
          console.log('rejected');
        });
    }
  }

}
