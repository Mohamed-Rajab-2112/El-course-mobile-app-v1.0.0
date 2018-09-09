import {Component, Input} from '@angular/core';

@Component({
  selector: 'xsource-error',
  templateUrl: 'error.html'
})

export class ErrorComponent {
  @Input() body = 'This field is required!';

  constructor() {
  }

}
