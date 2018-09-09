import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManuallyLocationPage } from './manually-location';
import {InterestsPage} from "../interests/interests";

@NgModule({
  declarations: [
    ManuallyLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ManuallyLocationPage),
  ],
  exports: [
    ManuallyLocationPage
  ]
})
export class ManuallyLocationPageModule {}
