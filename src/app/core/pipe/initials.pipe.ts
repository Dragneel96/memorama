import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    const initials = value.substr(0, 2).toUpperCase();
    return initials;
  }

}
