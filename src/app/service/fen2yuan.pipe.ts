import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'fen2yuan',
})
export class Fen2yuanPipe implements PipeTransform {

  transform(yuan: number | string | undefined) {
    if (typeof yuan !== 'number') yuan = Number(yuan);

    if (yuan === 0 || !yuan) return '0.00';
    return (0.01 * yuan).toFixed(2);
  }
}
