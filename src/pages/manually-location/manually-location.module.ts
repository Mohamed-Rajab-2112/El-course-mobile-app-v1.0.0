import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManuallyLocationPage } from './manually-location';

@NgModule({
  declarations: [
    ManuallyLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ManuallyLocationPage),
  ],
})
export class ManuallyLocationPageModule {}
