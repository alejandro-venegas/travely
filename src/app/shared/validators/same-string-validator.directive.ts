import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function sameString(str: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === str ? null : { wrongString: control.value };
}

@Directive({
  selector: '[appSameStringValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameStringValidatorDirective,
      multi: true,
    },
  ],
})
export class SameStringValidatorDirective implements Validator, OnChanges {
  private _onChange?: () => void;

  @Input() appSameStringValidator = '';
  validate(control: AbstractControl): ValidationErrors | null {
    return sameString(this.appSameStringValidator)(control);
  }

  registerOnValidatorChange(fn: () => void): void {
    this._onChange = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('appSameStringValidator' in changes) {
      if (this._onChange) {
        this._onChange();
      }
    }
  }
}
