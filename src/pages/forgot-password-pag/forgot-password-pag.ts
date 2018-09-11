import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth.provider";

@IonicPage()
@Component({
  selector: 'page-forgot-password-pag',
  templateUrl: 'forgot-password-pag.html',
})
export class ForgotPasswordPagPage {
  email;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.email = this.authProvider.currenWrittenEmail;
  }

  sendForgotPasswordEmail() {
    this.authProvider.sendForgotPasswordEmail(this.email);
  }

}
