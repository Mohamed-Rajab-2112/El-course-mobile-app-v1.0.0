import {NgModule} from '@angular/core';
import {CourseThumbnailComponent} from "./course-thumbnail/course-thumbnail.component";
import {Ionic2RatingModule} from 'ionic2-rating';
import {IonicModule} from 'ionic-angular';
import {CategoryComponent} from './category/category.component';
import {ErrorComponent} from './error/error.component';
import {NoteCompComponent} from './note-comp/note-comp';
import { NetworkErrorCompComponent } from './network-error-comp/network-error-comp';

@NgModule({
  declarations: [
    CourseThumbnailComponent,
    CategoryComponent,
    ErrorComponent,
    NoteCompComponent,
    NetworkErrorCompComponent
  ],
  imports: [Ionic2RatingModule, IonicModule],
  exports: [
    CourseThumbnailComponent,
    CategoryComponent,
    ErrorComponent,
    NoteCompComponent,
    NetworkErrorCompComponent
  ]
})
export class ComponentsModule {
}
