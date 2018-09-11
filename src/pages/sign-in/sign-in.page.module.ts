import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInPage } from './sign-in.page';
import {InterestsPage} from "../interests/interests.page";

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
  ],
  exports: [
    SignInPage
  ]
})
export class SignInPageModule {}
