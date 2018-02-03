import {Component, Input} from '@angular/core';

@Component({
  selector: 'category',
  templateUrl: 'category.html'
})

export class CategoryComponent {
  @Input() categoryCourses: any;

  constructor() {
  }


}
