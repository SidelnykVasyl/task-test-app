import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value || !args) {
      return value;
  }
    return value.filter(item => {
      return item.label.indexOf(args) !== -1 ||
             item.category.indexOf(args) !== -1 ||
             item.description.indexOf(args) !== -1;
    });
  }
}
