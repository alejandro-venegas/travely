import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  loadingSpinnerSubject = new BehaviorSubject<boolean>(false);
  constructor() {}

  toggleLoadingSpinner(forceValue?: boolean): void {
    let value = !this.loadingSpinnerSubject.getValue();
    if (typeof forceValue === 'boolean') {
      value = forceValue;
    }
    this.loadingSpinnerSubject.next(value);
  }
}
