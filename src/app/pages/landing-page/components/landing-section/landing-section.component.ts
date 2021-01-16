import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss'],
})
export class LandingSectionComponent implements OnInit {
  @Input() title = '';
  @Input() text = '';
  @Input() src = '';

  private stringArray: string[] = [];

  runningAnimationTimeout = setTimeout(() => {}, 0);

  // @ts-ignore
  @ViewChild('titleElement', { static: true }) titleElement: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.stringArray = this.title.split('');
    this.animateString();
  }

  animateString(): void {
    // TODO: Make directive
    this.stringArray.length > 0
      ? (this.titleElement.nativeElement.innerHTML += this.stringArray.shift())
      : clearTimeout(this.runningAnimationTimeout);
    this.runningAnimationTimeout = setTimeout(() => this.animateString(), 70);
  }
}
