import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuActive = false;
  @Output() menuActivated = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuActivated.emit(this.isMenuActive);
  }
}
