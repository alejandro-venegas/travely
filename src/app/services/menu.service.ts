import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  isMenuActiveSubject = new BehaviorSubject(false);
  constructor() {}
}
