import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuService } from '../../shared/services/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  onToggleMenu(): void {
    this.menuService.isMenuActiveSubject.next(
      !this.menuService.isMenuActiveSubject.getValue()
    );
  }
}
