import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
declare var Inputmask: any;
@Directive({
  selector: '[appInputMask]',
})
export class InputMaskDirective implements AfterContentInit {
  @Input() appInputMask = '';

  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    if (this.appInputMask) {
      if (this.appInputMask === 'datetime') {
        Inputmask({
          alias: 'datetime',
          inputFormat: 'dd/mm/yyyy',
          showMaskOnHover: false,
        }).mask(this.element.nativeElement);
      }
    }
  }
}
