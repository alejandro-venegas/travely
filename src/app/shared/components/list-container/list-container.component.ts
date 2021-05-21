import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/todo.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
})
export class ListContainerComponent implements OnInit {
  private _todoList: Todo[] = [];

  @Input() set todoList(todoList: Todo[]) {
    this._todoList = todoList;
  }
  get todoList(): Todo[] {
    return [...this._todoList];
  }
  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Todo[]>): void {
    moveItemInArray(this._todoList, event.previousIndex, event.currentIndex);
  }
}
