import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest.provider";
import {Subscription} from "rxjs/Subscription";
import {QuestionsPage} from "../questions/questions.page";
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {Keyboard} from "@ionic-native/keyboard";
import {AuthProvider} from "../../providers/auth/auth.provider";
import {SignInPage} from "../sign-in/sign-in.page";

@IonicPage()
@Component({
  selector: 'page-training-center-details',
  templateUrl: 'training-center-details.page.html',
})
export class TrainingCenterDetailsPage {
  trainingCenterDetails: any = {};
  getTrainingCenterByIdSubscribtion: Subscription;
  // userTypeSubscriptionthis: Subscription;
  userData: any;
  userTypeSubscription: Subscription;
  showAskQuestion: boolean;
  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, public loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private auth: AuthProvider) {
  }
  
  ionViewDidLoad() {
    this.getTrainingCenterDetails();
    this.userTypeSubscription = this.auth.userData.subscribe((userData) => {
        this.userData = userData && userData.userType;
        console.log(userData);
        this.showAskQuestion = !userData || this.userData.userType != 'trainingCenter';
      },
      err => {
        alert(err);
      });
  }
  
  ionViewWillEnter() {
    this.content.resize();
  }
  
  ionViewWillUnload() {
    this.getTrainingCenterByIdSubscribtion.unsubscribe();
    this.userTypeSubscription.unsubscribe();
  }
  
  getTrainingCenterDetails() {
    this.trainingCenterDetails = {};
    // let loader = this.loadingCtrl.create(this.utilities.loaderOptions);
    // loader.present().then(() => {
    this.utilities.showLoading()
      .then(() => {
        this.getTrainingCenterByIdSubscribtion = this.guestProvider.getTrainingCenterById(this.navParams.data).subscribe((trainingCenterDetails) => {
            this.trainingCenterDetails = trainingCenterDetails;
            this.utilities.hideLoading();
          },
          err => {
            this.utilities.hideLoading();
          });
      })
    // });
  }
  
  routeToQuestions($event) {
    if (this.userData) {
      this.navCtrl.push('QuestionsPage', this.trainingCenterDetails.id);
    } else {
      this.utilities.showAlert("Can't Ask", "Please Sign in first to ask questions.", "prompt", 'Sign In', 'Cancel')
        .then(() => {
          this.navCtrl.push('SignInPage');
        })
        .catch(() => {
          console.log('rejected');
        });
    }
  }
  
}
