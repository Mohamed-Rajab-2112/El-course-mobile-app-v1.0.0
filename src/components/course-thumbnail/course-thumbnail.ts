import {Component, Input} from '@angular/core';

@Component({
  selector: 'course-thumbnail',
  templateUrl: 'course-thumbnail.html'
})
export class CourseThumbnailComponent {
  @Input() course;

  constructor() {
    // console.log('Hello CourseThumbnailComponent Component');
    // this.text = 'Hello World';
  }

}
