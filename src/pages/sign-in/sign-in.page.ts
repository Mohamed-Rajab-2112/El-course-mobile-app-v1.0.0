import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth.provider";
// import {Facebook} from '@ionic-native/facebook'
import {UtilitiesProvider} from "../../providers/utilities/utilities.provider";
import {SignUpPage} from "../sign-up/sign-up.page";
import {jsonToBuildError} from "@ionic/app-scripts";
import {ForgotPasswordPagPage} from "../forgot-password-pag/forgot-password-pag";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.page.html',
})
export class SignInPage {
  @ViewChild(Content) content: Content;
  signInData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private alertCtrl: AlertController, private auth: AuthProvider, private utilities: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  signIn() {
    this.utilities.showLoading();
    this.auth.signIn(this.signInData)
      .then(() => {
        this.navCtrl.pop()
          .then(() => {
            this.utilities.hideLoading();
          })
      })
      .catch((err) => {
        this.utilities.hideLoading();
        this.utilities.showAlert('Error', err.message)
      })
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle()
      .then(() => {
        this.navCtrl.pop();
      })
      .catch(() => {

      })
  }

  signInWithFacebook() {
    this.auth.signInWithFacebook()
      .then(() => {
        this.navCtrl.pop();
      })
      .catch(() => {

      })
  }

  routrToSignUp() {
    this.navCtrl.push('SignUpPage');
  }

  routwToForgotPassword() {
    this.navCtrl.push('ForgotPasswordPagPage');
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }

  bindEmailToSaved(email) {
    this.auth.currenWrittenEmail = email;
  }

}
