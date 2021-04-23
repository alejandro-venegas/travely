import { Component, ElementRef, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './shared/services/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'travely';
  isMenuActive = false;
  isLoading = false;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  ngOnInit(): void {
    this.loadingSpinnerService.loadingSpinnerSubject.subscribe(
      (val) => (this.isLoading = val)
    );
  }

  onRouterActivate(appContainer: HTMLDivElement): void {
    appContainer.scroll(0, 0);
  }
}
