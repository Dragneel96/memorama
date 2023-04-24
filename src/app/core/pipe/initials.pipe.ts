import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  /**
   * This TypeScript function returns the first two characters of a string in uppercase.
   * @param {string} value - a string that represents a name or a word.
   * @returns the first two characters of the input string in uppercase.
   */
  transform(value: string): string {
    const initials = value.substr(0, 2).toUpperCase();
    return initials;
  }

}
