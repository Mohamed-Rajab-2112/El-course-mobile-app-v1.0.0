import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingCentersPage} from './training-centers';
import {InterestsPage} from "../interests/interests";

@NgModule({
  declarations: [
    TrainingCentersPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingCentersPage),
  ],
  exports: [
    TrainingCentersPage
  ]
})
export class TrainingCentersPageModule {
}
