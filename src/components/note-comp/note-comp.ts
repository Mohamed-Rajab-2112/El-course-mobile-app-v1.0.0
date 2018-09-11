import {Component, Input} from '@angular/core';

@Component({
  selector: 'note-comp',
  templateUrl: 'note-comp.html'
})

export class NoteCompComponent {
  @Input() body: string;

  constructor() {
  }

}
