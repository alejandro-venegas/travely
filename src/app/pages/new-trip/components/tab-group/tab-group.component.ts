import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
} from '@angular/core';
import { formFade } from '../../animations/form-fade.animation';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  animations: [formFade],
})
export class TabGroupComponent implements OnInit, AfterContentInit {
  private _stepperState: string[] = [];

  get stepperState(): string[] {
    return [...this._stepperState];
  }
  @ContentChildren(TemplateRef) tabs = new QueryList<TemplateRef<any>>();
  constructor() {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {
    this.initStepperState();
  }

  next(): void {
    this.setStepperState('next');
  }
  back(): void {
    this.setStepperState('back');
  }

  private initStepperState(): void {
    this.tabs.forEach((item, index) => {
      let state = 'right';
      if (index === 0) {
        state = 'center';
      }
      this._stepperState.push(state);
    });
  }

  private setStepperState(mode: 'next' | 'back'): void {
    const currentIndex = this.stepperState.findIndex(
      (value) => value === 'center'
    );
    if (mode === 'next') {
      const nextIndex = currentIndex + 1;
      if (nextIndex < this.stepperState.length) {
        this._stepperState[currentIndex] = 'left';
        this._stepperState[nextIndex] = 'center';
      }
    } else {
      const pastIndex = currentIndex - 1;
      if (pastIndex >= 0) {
        this._stepperState[currentIndex] = 'right';
        this._stepperState[pastIndex] = 'center';
      }
    }
  }
}
