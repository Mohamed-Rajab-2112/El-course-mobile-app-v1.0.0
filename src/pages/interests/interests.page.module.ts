import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InterestsPage} from './interests.page';
import {HttpModule} from '@angular/http';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    InterestsPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestsPage),
    HttpModule,
    PipesModule
  ],
  exports: [
    InterestsPage
  ]
})
export class InterestsPageModule {
}
