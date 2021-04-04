import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input[name][label]',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormInputComponent,
      multi: true,
    },
  ],
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
  onChange: any;
  onTouched: any;
  isFocused = false;
  inputValue = '';

  @Input() type = 'text';
  @Input() label = '';
  @Input() name = '';
  @Input() select?: any[];
  @Input() selectOptionLabel = 'label';
  @Input() selectOptionValue = '-';
  @Input() mask = '';

  constructor() {}

  ngOnInit(): void {}

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  change(value: any): void {
    if (this.onChange) {
      this.onChange(value);
    }
  }
  onFocus(value: boolean): void {
    this.isFocused = value;

    if (!value && this.onTouched) {
      this.onTouched();
    }
  }
}
