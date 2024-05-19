import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  private datePipe: DatePipe = new DatePipe('en-US');

  transform(value: any, args?: any): any {
    if (!value) return value;
    const formattedDate = this.datePipe.transform(value, 'EEE dd MMM HH:mm');
    return formattedDate;
  }

}
