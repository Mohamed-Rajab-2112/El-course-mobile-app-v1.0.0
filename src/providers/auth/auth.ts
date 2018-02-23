import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Facebook} from '@ionic-native/facebook'
import {Platform} from "ionic-angular";
import {NativeStorage} from '@ionic-native/native-storage';
import {UtilitiesProvider} from "../utilities/utilities";
import {GooglePlus} from '@ionic-native/google-plus';

@Injectable()
export class AuthProvider {
  // userType = new BehaviorSubject<string>('guest');
  userData = new BehaviorSubject<any>(null);

  constructor(public http: Http, private angularFireAuth: AngularFireAuth, public facebook: Facebook, private platform: Platform, private storage: NativeStorage, private utilities: UtilitiesProvider, private googlePlus: GooglePlus) {

  }

  // setUserType(value) {
  //   this.userType.next(value)
  // }

  setUserData(value) {
    if (!value) {
      alert('will remove user data');
      this.storage.remove('userData')
        .then(() => {
          this.userData.next(value);
        })
    } else {
      this.storage.setItem('userData', value)
        .then(() => {
          this.userData.next(value);
        })
    }
  }

  signInWithFacebook() {
    return new Promise((resolve, reject) => {
      // console.log('will check platform');
      this.utilities.showLoading()
        .then(() => {
          this.platform.ready().then((source) => {
            console.log(source);
            if (source == 'dom') {
              this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then(res => {
                  // alert(JSON.stringify(res, null, 3));
                  this.registerUserData(res, 'facebook', 'web');
                  this.utilities.hideLoading()
                    .then(() => {
                      resolve();
                    })
                })
                .catch((err) => {
                  // alert(err);
                  this.utilities.hideLoading()
                    .then(() => {
                      this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                        .then(() => {
                          reject();
                        })
                    })
                })
            } else {
              this.facebook.login(['email', 'public_profile'])
                .then((res) => {
                  // alert('will start sign in');
                  const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                  firebase.auth().signInWithCredential(facebookCredential).then((res) => {
                    // alert(JSON.stringify(res, null, 2));
                    this.registerUserData(res, 'facebook');
                    this.utilities.hideLoading()
                      .then(() => {
                        resolve();
                      })
                  })
                    .catch((err) => {
                      // alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                      this.utilities.hideLoading()
                        .then(() => {
                          this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                            .then(() => {
                              reject();
                            })
                        })
                    })
                })
                .catch((err) => {
                  // alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                  this.utilities.hideLoading()
                    .then(() => {
                      this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                        .then(() => {
                          reject();
                        })
                    })
                })
            }
          })
        })
    })
  }

  signInWithGoogle() {
    return new Promise((resolve, reject) => {
      this.utilities.showLoading()
        .then(() => {
          this.googlePlus.login({
            'webClientId': '60593959366-ka4glm7lk739i7hrp4cdulcdh5g91tjm.apps.googleusercontent.com',
            offline: true,
            prompt: 'select_account'
          }).then((res) => {
            // alert(JSON.stringify(res, null, 3));
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
            firebase.auth().signInWithCredential(googleCredential)
              .then((res) => {
                // alert(JSON.stringify(res, null, 3));
                this.registerUserData(res, 'google');
                this.utilities.hideLoading()
                  .then(() => {
                    resolve();
                  })
              })
              .catch((err) => {
                // alert(JSON.stringify(err, null, 3));
                this.utilities.hideLoading()
                  .then(() => {
                    this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                      .then(() => {
                        reject();
                      })
                  })
              })
          }, (err) => {
            // alert(JSON.stringify(err));
            this.utilities.hideLoading()
              .then(() => {
                this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                  .then(() => {
                    reject();
                  })
              })
          });
        });
    })
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this.utilities.showLoading()
        .then(() => {
          this.angularFireAuth.auth.signOut()
            .then(() => {
              this.storage.getItem('userData')
                .then((userData) => {
                  if (userData.authType == 'google') {
                    this.googlePlus.login({
                        'webClientId': '60593959366-ka4glm7lk739i7hrp4cdulcdh5g91tjm.apps.googleusercontent.com'
                      }
                    )
                      .then(() => {
                        this.googlePlus.logout()
                          .then(() => {
                            // alert('logging out');
                            this.setUserData(null);
                            this.utilities.hideLoading()
                              .then(() => {
                                resolve();
                              })
                          })
                          .catch((err) => {
                            // alert(JSON.stringify(err, null, 3));
                            this.utilities.hideLoading()
                              .then(() => {
                                this.utilities.showAlert('Failed', 'Failed Due to network error')
                              })
                          })
                      })
                      .catch((err) => {
                        alert(JSON.stringify(err, null, 3));
                        this.utilities.hideLoading()
                          .then(() => {
                            resolve();
                          })
                      })
                  } else if (userData.authType == 'facebook') {
                    this.facebook.logout()
                      .then(() => {
                        this.setUserData(null);
                        this.utilities.hideLoading()
                          .then(() => {
                            resolve();
                          })
                      })
                      .catch(() => {
                        this.utilities.hideLoading()
                          .then(() => {
                            this.utilities.showAlert('Failed', 'Failed Due to network error')
                          })
                      })
                  }
                })
                .catch((err) => {
                  alert(err);
                })
            })
            .catch(() => {
              this.utilities.hideLoading()
                .then(() => {
                  this.utilities.showAlert('Failed', 'Failed Due to network error')
                })
            })
        })
    })
  }

  registerUserData(userData, authType, platform = 'mobile') {
    let data: any;
    console.log(userData);
    console.log(platform);
    if (platform == 'mobile') {
      if (authType == 'facebook' || authType == 'google') {
        data = {
          uid: userData.uid,
          // accessToken: userData.stsTokenManager.accessToken,
          name: userData.displayName,
          email: userData.email,
          photo: userData.photoURL,
          userType: 'student',
          authType: authType
        };
      }
    } else {
      data = {
        uid: userData.user.uid,
        accessToken: userData.credential.accessToken,
        name: userData.user.displayName,
        email: userData.user.email,
        photo: userData.user.photoURL,
        userType: 'student'
      };
    }
    // this.setUserType('student');
    this.setUserData(data);
  }
}
