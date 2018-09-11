import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsPage } from './questions.page';
import {InterestsPage} from "../interests/interests.page";

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
