import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() theme: 'primary' | 'outlined' = 'primary';
  @Input() type: 'button' | 'reset' | 'submit' = 'submit';
  @Input() form = '';

  constructor() {}

  ngOnInit(): void {}
}
