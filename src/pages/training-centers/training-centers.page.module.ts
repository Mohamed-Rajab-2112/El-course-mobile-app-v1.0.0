import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TrainingCentersPage} from './training-centers.page';
import {InterestsPage} from "../interests/interests.page";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TrainingCentersPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(TrainingCentersPage),
  ],
  exports: [
    TrainingCentersPage
  ]
})
export class TrainingCentersPageModule {
}
