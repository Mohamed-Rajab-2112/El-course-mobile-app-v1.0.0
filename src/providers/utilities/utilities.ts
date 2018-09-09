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
  phoneRegex = /^\d+$/;


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
    return new Promise((resolve, reject) => {
      if (type == 'alert') {
        let alert = this.alertCtrl.create({
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
        alert.present();
      } else if (type == 'prompt') {
        let prompt = this.alertCtrl.create({
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
        prompt.present();
      }
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
