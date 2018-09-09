import {NgModule} from '@angular/core';
import {CourseThumbnailComponent} from "./course-thumbnail/course-thumbnail";
import {Ionic2RatingModule} from 'ionic2-rating';
import {IonicModule} from 'ionic-angular';
import { CategoryComponent } from './category/category';
import { ErrorComponent } from './error/error';

@NgModule({
  declarations: [CourseThumbnailComponent,
    CategoryComponent,
    ErrorComponent],
  imports: [Ionic2RatingModule, IonicModule],
  exports: [CourseThumbnailComponent,
    CategoryComponent,
    ErrorComponent]
})
export class ComponentsModule {
}
