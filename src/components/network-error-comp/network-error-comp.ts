import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'network-error-comp',
  templateUrl: 'network-error-comp.html'
})
export class NetworkErrorCompComponent {
  @Output() retryAction = new EventEmitter();
  @Input() disableRetryBtn;

  constructor() {
  }

  retry() {
    this.retryAction.emit();
  }

}
