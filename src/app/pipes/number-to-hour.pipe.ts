import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToHour'
})
export class NumberToHourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const part = value > 12 ? 'PM' : 'AM';
    const hour = value === 0 ?
      12 :
      value > 12 ? value - 12 : value;

    return hour + part;
  }

}
