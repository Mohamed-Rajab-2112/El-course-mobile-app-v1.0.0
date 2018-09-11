import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {Facebook} from '@ionic-native/facebook'
import {Platform} from "ionic-angular";
import {NativeStorage} from '@ionic-native/native-storage';
import {UtilitiesProvider} from "../utilities/utilities.provider";
import {GooglePlus} from '@ionic-native/google-plus';

@Injectable()
export class AuthProvider {
  // userType = new BehaviorSubject<string>('guest');
  userData = new BehaviorSubject<any>(null);

  // databaseUserData: any;

  constructor(public http: Http, private angularFireAuth: AngularFireAuth, private angularFireStore: AngularFirestore, public facebook: Facebook, private platform: Platform, private storage: NativeStorage, private utilities: UtilitiesProvider, private googlePlus: GooglePlus) {

  }

  signUp(signUpDate) {
    console.log(signUpDate.email, signUpDate.password);
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(signUpDate.email, signUpDate.password)
        .then((userData) => {
          console.log('signed up');
          console.log(userData);
          let data = {
            uid: userData.uid,
            name: signUpDate.name,
            email: userData.email,
            userType: 'student',
            authType: 'default'
          };
          this.registerUserData(data, 'default')
            .then((userData) => {
              this.storeUserInDatabase(userData);
            });
          this.signIn(signUpDate)
            .then(() => {
              resolve();
            });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        })
    })
  }

  signIn(signInData) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(signInData.email, signInData.password)
        .then((userData) => {
          console.log(userData);
          let selectUserByUID = this.angularFireStore.collection('users', (ref) => ref.where('uid', '==', userData.uid));
          selectUserByUID.valueChanges().subscribe((selectedUsers) => {
            const selectedUser: any = selectedUsers[0];
            let data = {
              uid: selectedUser.uid,
              name: selectedUser.name,
              email: selectedUser.email,
              photo: selectedUser.photo ? selectedUser.photo : 'assets/images/default-user-avatar.png',
              userType: selectedUser.userType,
              authType: selectedUser.authType
            };
            this.registerUserData(data, selectedUser.authType)
              .then((userData) => {
                this.setUserData(userData);
              });
            resolve();
          });
        })
        .catch((err) => {
          reject(err);
        })
    });
  }

  setUserData(value) {
    if (!value) {
      this.storage.remove('userData')
        .then(() => {
          this.userData.next(value);
        })
    } else {
      console.log('will save  user data');
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
      // .then(() => {
      this.platform.ready().then((source) => {
        console.log(source);
        if (source == 'dom') {
          this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then(res => {
              // alert(JSON.stringify(res, null, 3));
              this.registerUserData(res, 'facebook', 'web')
                .then((userData) => {
                  this.storeUserInDatabase(userData);
                  this.setUserData(userData);
                });
              this.utilities.hideLoading()
                .then(() => {
                  resolve();
                })
            })
            .catch((err) => {
              console.log(err);
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
              firebase.auth().signInWithCredential(facebookCredential)
                .then((retrievedUserData) => {
                  alert(JSON.stringify(retrievedUserData, null, 3));
                  // alert(JSON.stringify(res.providerData, null, 3));
                  this.registerUserData(retrievedUserData, 'facebook')
                    .then((userData) => {
                      this.storeUserInDatabase(userData);
                      this.setUserData(userData);
                    });
                  this.utilities.hideLoading()
                  // .then(() => {
                  resolve();
                  // })
                })
                .catch((err) => {
                  // alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
                  this.utilities.hideLoading()
                  // .then(() => {
                  this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                    .then(() => {
                      reject();
                    })
                  // })
                })
            })
            .catch((err) => {
              // alert(JSON.stringify(err, Object.getOwnPropertyNames(err)));
              this.utilities.hideLoading()
              // .then(() => {
              this.utilities.showAlert('Failed', 'Log in Failed, please try again')
                .then(() => {
                  reject();
                })
              // })
            })
        }
      })
      // })
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
                this.registerUserData(res, 'google')
                  .then((userData) => {
                    this.storeUserInDatabase(userData);
                    this.setUserData(userData)
                  });
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
                        resolve();
                      })
                      .catch((err) => {
                        reject();
                      })
                  })
                  .catch((err) => {
                    alert(JSON.stringify(err, null, 3));
                    resolve();
                  })
              }
              else if (userData.authType == 'facebook') {
                this.facebook.logout()
                  .then(() => {
                    this.setUserData(null);
                    resolve();
                  })
                  .catch(() => {
                    reject();
                  })
              }
              else if (userData.authType == 'default') {
                this.setUserData(null);
                resolve();
              }
            })
            .catch((err) => {
              reject();
            })
        })
        .catch(() => {
          reject();
        })
    })
  }

  registerUserData(userData, authType, platform = 'mobile') {
    let data: any;
    return new Promise((resolve, reject) => {
      if (platform == 'mobile') {
        if (authType == 'google') {
          data = {
            uid: userData.uid,
            name: userData.displayName,
            email: userData.email,
            photo: userData.photoURL,
            userType: 'student',
            authType: authType
          };
        } else if (authType == 'facebook') {
          data = {
            uid: userData.uid,
            name: userData.displayName,
            email: userData.email,
            photo: userData.providerData[0].photoURL,
            userType: 'student',
            authType: authType
          };
        } else {
          data = userData;
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
      resolve(data);
    });
    /*will un-comment when innstall android sdk on mobile*/
    // this.setUserData(data);
  }

  storeUserInDatabase(data) {
    this.angularFireStore.collection('users').doc(data.uid).set(data)
      .then(() => {
        console.log('stored')
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
