import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: User | null = null;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setAuth();
  }

  setAuth(): void {
    this.authService.userSubject.subscribe((user) => (this.user = user));
  }

  onLogOut(): void {
    this.authService.logOut();
    this.router.navigate(['/']);
    this.menuService.isMenuActiveSubject.next(false);
  }

  onNavClick(route: string): void {
    this.menuService.isMenuActiveSubject.next(false);
    this.router.navigate([route]);
  }
}
