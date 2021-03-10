import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
  animations: [
    trigger('stepper', [
      state(
        'left',
        style({
          height: '15rem',
          width: 0,
          overflow: 'visible',
          transform: 'translateX(-100vw)',
        })
      ),
      state(
        'center',
        style({
          transform: 'unset',
        })
      ),
      state(
        'right',
        style({
          height: '15rem',
          width: 0,
          overflow: 'visible',
          transform: 'translateX(100vw)',
        })
      ),
      transition('void => *', []),
      transition('* => left', [animate('0.7s')]),
      transition('* => right', [animate('0.7s')]),
      transition('* => center', [animate('0.7s')]),
    ]),
  ],
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
