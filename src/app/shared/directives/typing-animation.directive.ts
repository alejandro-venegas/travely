import {
  AfterContentInit,
  Directive,
  ElementRef, Input,
} from '@angular/core';

@Directive({
  selector: '[appTypingAnimation]',
  exportAs: 'typingAnimation',
})
export class TypingAnimationDirective implements AfterContentInit {
  @Input() appTypingAnimation = false;
  private stringArray: string[] = [];

  runningAnimationTimeout = setTimeout(() => {}, 0);

  constructor(private element: ElementRef) {}

  ngAfterContentInit(): void {
    if (this.appTypingAnimation) {
      const nativeElement = this.element.nativeElement;
      const text: string = nativeElement.innerHTML;
      nativeElement.innerHTML = '';
      this.stringArray = text.split('');
      this.animateString();
    }
  }

  animateString(): void {
    this.stringArray.length > 0
      ? (this.element.nativeElement.innerHTML += this.stringArray.shift())
      : clearTimeout(this.runningAnimationTimeout);
    this.runningAnimationTimeout = setTimeout(() => this.animateString(), 70);
  }
}
