import {Component, Input} from '@angular/core';

@Component({
  selector: 'category',
  templateUrl: 'category.component.html'
})

export class CategoryComponent {
  @Input() categoryCourses: any = {};
  @Input() hasMoreButtonByDefault;

  constructor() {
  }


}
