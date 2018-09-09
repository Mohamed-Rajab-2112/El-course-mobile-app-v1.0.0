import {Component, OnDestroy} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';

import {InterestsPage} from "../interests/interests";
import {StudentProvider} from "../../providers/student/student";
import {GuestProvider} from "../../providers/guest/guest";
import {Subscription} from "rxjs";
import {UtilitiesProvider} from "../../providers/utilities/utilities";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {
  myInput: string;
  joinedCoursesSubscription: Subscription;
  feedCoursesSubscription: Subscription;
  joinedCourses: any[];
  feedCourses: any[];

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private studentProvider: StudentProvider, private guestProvider: GuestProvider, private utilitiesProvider: UtilitiesProvider) {

  }

  ionViewDidLoad() {
    this.joinedCourses = [];
    console.log('in view');
    this.joinedCoursesSubscription = this.studentProvider.getJoinedCourses(1)
      .subscribe((joinedCourses) => {
        this.joinedCourses = joinedCourses;
        console.log(this.joinedCourses);
      });

    this.feedCoursesSubscription = this.guestProvider.getFeeds([1, 3, 2])
      .subscribe((joinedCourses) => {
        this.feedCourses = joinedCourses;
        console.log(this.feedCourses);
      });
    this.utilitiesProvider.setHomePage(HomePage);
  }

  ngOnDestroy() {
    this.joinedCoursesSubscription.unsubscribe();
    this.feedCoursesSubscription.unsubscribe()
  }

  onInput(text) {
    console.log(text);
    console.log(this.myInput)
  }

  onCancel(cancel) {
    console.log(cancel);
  }

  openMenu() {
    // console.log('open menu')
    this.menuCtrl.toggle();
  }

  routeToDetails() {
    this.navCtrl.push('interestsPage');
  }


}
