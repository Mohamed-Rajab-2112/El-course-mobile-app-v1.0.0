import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  ionViewWillEnter() {
    this.content.resize();
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }

}
