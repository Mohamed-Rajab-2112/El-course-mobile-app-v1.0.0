import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any[], ...args) {
    console.log(value);
    return (value != undefined) && value.sort((a, b) => {
        return a[args[0]] - b[args[0]];
      });
  }
}
