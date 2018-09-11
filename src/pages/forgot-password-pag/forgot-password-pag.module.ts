import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ForgotPasswordPagPage} from './forgot-password-pag';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ForgotPasswordPagPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ForgotPasswordPagPage),
  ],
  exports: [
    ForgotPasswordPagPage
  ]
})
export class ForgotPasswordPagPageModule {
}
