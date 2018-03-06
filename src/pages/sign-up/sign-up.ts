import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {UtilitiesProvider} from "../../providers/utilities/utilities";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  signUpDate: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private utilities: UtilitiesProvider) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  
  signUp() {
    console.log(this.signUpDate);
    this.utilities.showLoading()
      .then(() => {
        this.auth.signUp(this.signUpDate)
          .then(() => {
            this.utilities.hideLoading()
              .then(() => {
                this.navCtrl.popToRoot();
              })
          })
          .catch(() => {
            this.utilities.hideLoading()
              .then(() => {
                this.utilities.showAlert('Failed', 'Failed to sign up due to err, please try again later.')
              })
          })
      })
    
  }
  
}
