import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GuestProvider} from "../../providers/guest/guest.provider";
import {Subscription} from "rxjs/Subscription";
import {QuestionsPage} from "../questions/questions.page";
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {Keyboard} from "@ionic-native/keyboard";
import {AuthProvider} from "../../providers/auth/auth.provider";
import {SignInPage} from "../sign-in/sign-in.page";
import {TrainingCenterProvProvider} from "../../providers/training-center-prov/training-center-prov";
import {CallNumber} from '@ionic-native/call-number';
import {SharedProvider} from "../../providers/shared/shared.provider";

@IonicPage()
@Component({
  selector: 'page-training-center-details',
  templateUrl: 'training-center-details.page.html',
})
export class TrainingCenterDetailsPage {
  trainingCenterDetails: any = {};
  getTrainingCenterByIdSubscribtion: Subscription;
  userData: any = null;
  userTypeSubscription: Subscription;
  showAskQuestion: boolean;
  networkStatus: boolean;
  @ViewChild(Content) content: Content;
  @ViewChild('phoneFab') phoneFab;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, public loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private auth: AuthProvider, private trainingCenterProvider: TrainingCenterProvProvider, public callNumberProvider: CallNumber, private sharedProvider: SharedProvider) {
  }

  ionViewDidLoad() {
    this.networkStatus = this.sharedProvider.connectionStatus.value;
    if (this.networkStatus) {
      this.getTrainingCenterDetails();
      this.getCoursesByTrainingCenter();
      this.userTypeSubscription = this.auth.userData.subscribe((userData) => {
          this.userData = userData && userData.userType;
          this.showAskQuestion = !userData || this.userData.userType != 'trainingCenter';
        },
        err => {
          alert(err);
        });
    }
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  ionViewWillUnload() {
    this.phoneFab.close();
    this.getTrainingCenterByIdSubscribtion && this.getTrainingCenterByIdSubscribtion.unsubscribe();
    this.userTypeSubscription && this.userTypeSubscription.unsubscribe();
  }

  getTrainingCenterDetails() {
    this.trainingCenterDetails = {};
    this.utilities.showLoading()
    // .then(() => {
    console.log(this.navParams.data);
    this.getTrainingCenterByIdSubscribtion = this.trainingCenterProvider.getTrainingCenterDetailsById(this.navParams.data)
      .subscribe((trainingCenterDetails) => {
          console.log(trainingCenterDetails);
          this.trainingCenterDetails = trainingCenterDetails;
          this.utilities.hideLoading();
        },
        err => {
          this.utilities.hideLoading();
          this.networkStatus = false;
        });
    // })
  }

  getCoursesByTrainingCenter() {
    this.trainingCenterProvider.getCoursesByTrainingCenterId(this.navParams.data)
      .subscribe((courses) => {
          this.trainingCenterDetails.courses = courses;
        },
        err => {
          this.utilities.hideLoading();
          this.networkStatus = false;
        })
  }

  routeToQuestions($event) {
    if (this.userData) {
      this.navCtrl.push('QuestionsPage', this.trainingCenterDetails.id);
    } else {
      this.utilities.showAlert("Log in", "Please Log in first to ask questions.", "prompt", 'Log in', 'Cancel')
        .then(() => {
          this.navCtrl.push('SignInPage');
        })
        .catch(() => {
          console.log('rejected');
        });
    }
  }

  checkIfCanCall() {
    if (!this.userData) {
      this.utilities.showAlert("Log in", 'Please Log in first to call this training center', 'prompt', 'Log in', 'Cancel')
        .then(() => {
          /*state for accepted log in*/
          this.navCtrl.push('SignInPage');
        })
        .catch(() => {
          /*state for rejected log in*/
        })
    }
  }

  makeCall(number) {
    this.phoneFab.close();
    this.callNumberProvider.callNumber(number, false)
      .then(() => {
        /*later will be state here to measure number of calls*/
      })
      .catch((res) => {
        // alert(JSON.stringify(res, null, 3))
        this.utilities.showAlert('Error', 'Error in Calling, please try again later')
      })
  }

  openWhatsappChat() {
    if (this.userData) {
      if (this.trainingCenterDetails.whatsApp) {
        window.open('https://wa.me/' + this.trainingCenterDetails.whatsApp)
      } else {
        this.utilities.showAlert('Error', "This training center doesn't have whatsApp")
      }
    } else {
      this.utilities.showAlert("Log in", "Please Log in to contact this training center by whatsApp", 'prompt', 'Log in', 'Cancel')
        .then(() => {
          this.navCtrl.push('SignInPage');
          /*state for accepted log in*/
        })
        .catch(() => {
          /*state for rejected log in*/
        })
    }
  }

  openFacebookPage() {
    if (this.userData) {
      if (this.trainingCenterDetails.facebookPage) {
        window.open(this.trainingCenterDetails.facebookPage)
      } else {
        this.utilities.showAlert('Error', "This training center doesn't have facebook page")
      }
    } else {
      this.utilities.showAlert("Log in", "Please Log in to View this training center facebook page", 'prompt', 'Log in', 'Cancel')
        .then(() => {
          this.navCtrl.push('SignInPage');
          /*state for accepted log in*/
        })
        .catch(() => {
          /*state for rejected log in*/
        })
    }
  }

}
