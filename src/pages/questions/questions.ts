import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Subscription} from "rxjs/Subscription";
import {GuestProvider} from "../../providers/guest/guest";
import {UtilitiesProvider} from "../../providers/utilities/utilities";
import {StudentProvider} from "../../providers/student/student";
import {Keyboard} from "@ionic-native/keyboard";

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  getTrainingCenterByIdSubscribtion: Subscription;
  trainingCenterDetails: any = {};
  questions: any[] = [{}];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private guestProvider: GuestProvider, private loadingCtrl: LoadingController, private utilities: UtilitiesProvider, private studentProvider: StudentProvider, private keyboard: Keyboard) {
  }

  ionViewDidLoad() {
    this.getTrainingCenterDetails();
    this.keyboard.disableScroll(true);
    // this.KeyboardCloseSubscription = this.keyboard.onKeyboardHide().subscribe(() => {
    //   alert('closed');
    // })
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  ionViewWillUnload() {
    this.getTrainingCenterByIdSubscribtion.unsubscribe();
  }

  addQuestion() {
    this.questions.push({});
  }

  removeQuestion(i) {
    this.questions.splice(i, 1);
  }

  /*api calls*/

  postQuestions() {
    let questionsToPost = this.questions.filter((question) => {
      console.log(question.question && question.question.length);
      return question.question && question.question.length
    });
    console.log(questionsToPost);
    questionsToPost.length && this.studentProvider.postQuestions(questionsToPost).subscribe(() => {
        this.utilities.showAlert('Success', 'Questions Send successfully', 'prompt')
      },
      err => {
        this.utilities.showAlert('Failed', 'Failed to send questions.', 'alert')
      });
  }

  getTrainingCenterDetails() {
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
}
