import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InterestsPage} from './interests';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    InterestsPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestsPage),
    HttpModule,
  ]
})
export class InterestsPageModule {
}
