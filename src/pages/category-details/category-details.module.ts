import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryDetailsPage } from './category-details';
import {CategoriesPage} from "../categories/categories";

@NgModule({
  declarations: [
    CategoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryDetailsPage),
  ],
  exports: [
    CategoryDetailsPage
  ]
})
export class CategoryDetailsPageModule {}
