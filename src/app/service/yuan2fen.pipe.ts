import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'yuan2fen',
})
export class Yuan2FenPipe implements PipeTransform {

  transform(value: number | string): number {
    if (typeof value === 'string') {
      value = Number(value);
    }
    if (value === 0 || !value) return 0;
    return parseFloat((100 * value).toFixed(0));
  }

}
