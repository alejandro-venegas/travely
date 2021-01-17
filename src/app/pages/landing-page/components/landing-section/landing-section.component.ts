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
  @Input() isHero = false;

  constructor() {}

  ngOnInit(): void {}
}
