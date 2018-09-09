import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingCenterDetailsPage} from './training-center-details';
import {ComponentsModule} from "../../components/components.module";
import {InterestsPage} from "../interests/interests";

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
  ]
})
export class TrainingCenterDetailsPageModule {
}
