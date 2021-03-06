import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignUpPage} from './sign-up.page';
import {ComponentsModule} from "../../components/components.module";
import {InterestsPage} from "../interests/interests.page";

@NgModule({
  declarations: [
    SignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignUpPage),
    ComponentsModule
  ],
  exports: [
    SignUpPage
  ]
})
export class SignUpPageModule {
}
