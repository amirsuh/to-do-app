import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shoeWork',
})
export class ShoeWorkPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
