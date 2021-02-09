import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function usedString(strArray: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const foundString = strArray.find((str) => str === value);
    return foundString ? { usedString: foundString } : null;
  };
}

@Directive({
  selector: '[appUsedStringValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UsedStringValidatorDirective,
      multi: true,
    },
  ],
})
export class UsedStringValidatorDirective implements Validator {
  @Input() appUsedStringValidator: string[] = [];
  validate(control: AbstractControl): ValidationErrors | null {
    return usedString(this.appUsedStringValidator)(control);
  }
}
