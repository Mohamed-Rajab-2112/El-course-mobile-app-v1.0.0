import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingCentersPage } from './training-centers';

@NgModule({
  declarations: [
    TrainingCentersPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingCentersPage),
  ],
})
export class TrainingCentersPageModule {}
