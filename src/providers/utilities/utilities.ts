import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import {InterestsPage} from "../../pages/interests/interests";
import {animationFrame} from "rxjs/scheduler/animationFrame";
import {AlertController} from "ionic-angular";


@Injectable()
export class UtilitiesProvider {
  homePage = new BehaviorSubject<any>(InterestsPage);
  loaderOptions: any = {};

  constructor(public http: Http, private alertCtrl: AlertController) {
    this.loaderOptions = {
      spinner: 'dots',
      content: "Please wait..."
    }
  }

  setHomePage(value) {
    this.homePage.next(value)
  }

  showAlert(title, body, type, acceptBtnTxt?, cancelBtnTxt?) {
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
                console.log('Cancel clicked');
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
                return true;
              }
            },
            {
              text: acceptBtnTxt,
              handler: () => {
                resolve();
                return true;
              }
            }
          ],
          enableBackdropDismiss: false
        });
      }
      console.log(alert);
      alert.present();
    })
  }

}
