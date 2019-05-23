import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})

export class SortingCompaniesPipe implements PipeTransform {

  transform(value: Array<any>, args: any[]): any[] {

    let field: string = args.toString();
    if(value == null) {
      return null;
    }


    value.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });

      return value;
    }
  }
