import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  Renderer2,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TabGroupComponent implements OnInit, AfterContentInit {
  @ContentChildren(TabComponent) tabs = new QueryList<TabComponent>();
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.tabs.forEach((item, index) => {
      this.renderer.setAttribute(
        item.nativeElement.nativeElement,
        'tabIndexNumber',
        index.toString()
      );
    });
  }
}
