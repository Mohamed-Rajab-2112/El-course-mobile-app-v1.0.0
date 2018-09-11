import {Component, Input} from '@angular/core';

@Component({
  selector: 'xsource-error',
  templateUrl: 'error.component.html'
})

export class ErrorComponent {
  @Input() body = 'This field is required!';

  constructor() {
  }

}
