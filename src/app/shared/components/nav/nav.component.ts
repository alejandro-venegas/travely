import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void {}

  onNavClick(route: string): void {
    this.menuService.isMenuActiveSubject.next(false);
    this.router.navigate([route]);
  }
}
