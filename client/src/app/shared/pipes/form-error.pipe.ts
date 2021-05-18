import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formError'
})
export class FormErrorPipe implements PipeTransform {

  transform(value: string, args: any): string {
    console.log('args', args)
    if (args) {
      return value.replace('{{param1}}', args);
    }
   return value;

  }

}
