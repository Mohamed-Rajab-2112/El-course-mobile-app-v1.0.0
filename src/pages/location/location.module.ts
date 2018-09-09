import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import {InterestsPage} from "../interests/interests";

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
  ],
  exports: [
    LocationPage
  ]
})
export class LocationPageModule {}
