import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPage } from './questions';
import {InterestsPage} from "../interests/interests";

@NgModule({
  declarations: [
    QuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsPage),
  ],
  exports: [
    QuestionsPage
  ]
})
export class QuestionsPageModule {}
