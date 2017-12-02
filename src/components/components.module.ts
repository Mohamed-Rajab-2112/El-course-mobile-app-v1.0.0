import {NgModule} from '@angular/core';
import {CourseThumbnailComponent} from "./course-thumbnail/course-thumbnail";
import {Ionic2RatingModule} from 'ionic2-rating';
import {IonicModule} from 'ionic-angular';

@NgModule({
  declarations: [CourseThumbnailComponent],
  imports: [Ionic2RatingModule, IonicModule],
  exports: [CourseThumbnailComponent]
})
export class ComponentsModule {
}
