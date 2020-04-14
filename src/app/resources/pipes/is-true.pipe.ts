import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isTrue'
})
export class IsTruePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value ? 'Sim' : 'Não';
  }

}
