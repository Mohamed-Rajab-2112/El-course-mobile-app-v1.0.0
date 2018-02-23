import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
// import {Facebook} from '@ionic-native/facebook'
import {UtilitiesProvider} from "../../providers/utilities/utilities";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private alertCtrl: AlertController, private auth: AuthProvider, private utilities: UtilitiesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  ionViewWillEnter() {
    this.content.resize();
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

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }

}
