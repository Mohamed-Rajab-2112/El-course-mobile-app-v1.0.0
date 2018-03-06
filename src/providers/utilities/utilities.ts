import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import {InterestsPage} from "../../pages/interests/interests";
import {animationFrame} from "rxjs/scheduler/animationFrame";
import {AlertController, LoadingController} from "ionic-angular";


@Injectable()
export class UtilitiesProvider {
  homePage = new BehaviorSubject<any>(InterestsPage);
  loaderOptions: any = {};
  loader: any;
  
  constructor(public http: Http, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.loaderOptions = {
      spinner: 'dots',
      content: "Please wait..."
    }
  }
  
  setHomePage(value) {
    this.homePage.next(value)
  }
  
  showAlert(title, body, type = 'alert', acceptBtnTxt = 'Ok', cancelBtnTxt = 'Cancel') {
    // let alert;
    
    return new Promise((resolve, reject) => {
      let alert;
      if (type == 'alert') {
        alert = this.alertCtrl.create({
          title: title,
          message: body,
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                resolve();
              }
            }
          ],
          enableBackdropDismiss: false
        });
      } else if (type == 'prompt') {
        alert = this.alertCtrl.create({
          title: title,
          message: body,
          buttons: [
            {
              text: cancelBtnTxt,
              role: 'cancel',
              handler: () => {
                reject();
              }
            },
            {
              text: acceptBtnTxt,
              handler: () => {
                resolve();
              }
            }
          ],
          enableBackdropDismiss: false
        });
      }
      alert.present();
    })
  }
  
  showLoading() {
    this.loader = this.loadingCtrl.create(this.loaderOptions);
    return this.loader.present()
  }
  
  hideLoading() {
    return this.loader.dismiss();
  }
}
