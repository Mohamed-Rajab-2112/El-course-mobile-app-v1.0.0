import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingCenterDetailsPage} from './training-center-details.page';
import {ComponentsModule} from "../../components/components.module";
import {InterestsPage} from "../interests/interests.page";
import {CallNumber} from "@ionic-native/call-number";

@NgModule({
  declarations: [
    TrainingCenterDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingCenterDetailsPage),
    ComponentsModule
  ],
  exports: [
    TrainingCenterDetailsPage
  ],
  providers:[
    CallNumber
  ]
})
export class TrainingCenterDetailsPageModule {
}
