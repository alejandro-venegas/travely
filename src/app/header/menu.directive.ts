import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appMenu]',
})
export class MenuDirective {
  constructor() {}

  @Input() isActive = false;
  @HostBinding('class.is-active') get setClass(): boolean {
    return this.isActive;
  }
}
