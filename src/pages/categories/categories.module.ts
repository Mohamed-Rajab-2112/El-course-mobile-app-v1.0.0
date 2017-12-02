import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
import {ComponentsModule} from "../../components/components.module";
import {Ionic2RatingModule} from 'ionic2-rating';

@NgModule({
  declarations: [
    // CategoriesPage,
  ],
  imports: [
    ComponentsModule,
    Ionic2RatingModule,
    IonicPageModule.forChild(CategoriesPage),
  ],
})
export class CategoriesPageModule {}
