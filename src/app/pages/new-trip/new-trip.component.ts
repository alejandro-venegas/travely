import { Component, OnInit } from '@angular/core';
import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { formFade } from './animations/form-fade.animation';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
  animations: [formFade],
})
export class NewTripComponent implements OnInit {
  stepperState: string[] = ['center', 'right'];
  constructor() {}

  ngOnInit(): void {}

  onNextClick(): void {
    const currentIndex = this.stepperState.findIndex(
      (value) => value === 'center'
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.stepperState.length) {
      this.stepperState[currentIndex] = 'left';
      this.stepperState[nextIndex] = 'center';
    }
  }
  onBackClick(): void {
    const currentIndex = this.stepperState.findIndex(
      (value) => value === 'center'
    );
    const pastIndex = currentIndex - 1;
    if (pastIndex >= 0) {
      this.stepperState[currentIndex] = 'right';
      this.stepperState[pastIndex] = 'center';
    }
  }
}
