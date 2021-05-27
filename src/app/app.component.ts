import { Component, ElementRef, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './shared/services/loading-spinner.service';
import { AuthService } from './shared/services/auth.service';
import { fader } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent implements OnInit {
  title = 'travely';
  isMenuActive = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadingSpinnerService.loadingSpinnerSubject.subscribe((val) =>
      setTimeout(() => (this.isLoading = val))
    );
    this.authService.autoLogIn();
  }

  onRouterActivate(appContainer: HTMLDivElement): void {
    appContainer.scroll(0, 0);
  }
}
