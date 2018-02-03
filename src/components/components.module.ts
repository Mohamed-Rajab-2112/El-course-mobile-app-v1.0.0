import {NgModule} from '@angular/core';
import {CourseThumbnailComponent} from "./course-thumbnail/course-thumbnail";
import {Ionic2RatingModule} from 'ionic2-rating';
import {IonicModule} from 'ionic-angular';
import { CategoryComponent } from './category/category';

@NgModule({
  declarations: [CourseThumbnailComponent,
    CategoryComponent],
  imports: [Ionic2RatingModule, IonicModule],
  exports: [CourseThumbnailComponent,
    CategoryComponent]
})
export class ComponentsModule {
}
