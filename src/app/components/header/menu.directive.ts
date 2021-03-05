import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';

@Directive({
  selector: '[appMenu]',
})
export class MenuDirective implements OnInit {
  private isActive = false;
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.isMenuActiveSubject.subscribe(
      (value) => (this.isActive = value)
    );
  }

  @HostBinding('class.is-active') get setClass(): boolean {
    return this.isActive;
  }
}
