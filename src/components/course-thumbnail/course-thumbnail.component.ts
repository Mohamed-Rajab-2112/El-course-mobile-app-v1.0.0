import {Component, Input} from '@angular/core';

@Component({
  selector: 'course-thumbnail',
  templateUrl: 'course-thumbnail.component.html'
})
export class CourseThumbnailComponent {
  @Input() course;

  constructor() {

  }

}
