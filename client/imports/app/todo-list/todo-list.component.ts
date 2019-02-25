import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Todos } from '../../../../imports/collections/todos';
import { Todo } from '../../../../imports/models/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.html',
  // styleUrls: ['./todo-list.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Observable<Todo[]>;
  todostoday: Observable<Todo[]>;
  todoListSubscription: Subscription;
  hideDone: boolean = false;

  ngOnInit() {
    this.todoListSubscription = MeteorObservable.subscribe('todoList').subscribe(() => {
      this.todos = Todos.find({
        parent: null
      });
      this.todostoday = Todos.find({
        today: true
      });
    });
  }

  ngOnDestroy() {
    if (this.todoListSubscription) {
      this.todoListSubscription.unsubscribe();
    }
  }
  addTodo() {
    Meteor.call('addTodo', "new task", null);
  }
  toggleDone() {
    this.hideDone = !this.hideDone;
    console.log(this.hideDone);
  }
}
