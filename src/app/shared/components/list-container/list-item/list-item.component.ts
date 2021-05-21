import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../interfaces/todo.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  private _todo: Todo | null = null;
  @Input() set todo(todo: Todo | null) {
    this._todo = todo;
  }
  get todo(): Todo | null {
    return this._todo;
  }
  constructor() {}

  ngOnInit(): void {}
}
