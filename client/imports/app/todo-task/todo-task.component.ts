import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Todos } from 'imports/collections/todos';
import { Todo } from 'imports/models/todo';

@Component({
  selector: 'todo-task',
  templateUrl: 'todo-task.html',
  styleUrls: ['todo-task.scss'],
  inputs: ['task']
})
export class TodoTaskComponent implements OnInit {
  task: Todo;
  childs: Observable<Todo[]>;
  taskSub: Subscription;

  ngOnInit() {
    this.taskSub = MeteorObservable.subscribe('todoList').subscribe(() => {
      this.childs = Todos.find({
        parent: this.task._id
      });
    });
  }

  ngOnDestroy() {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }
  }

  delete(id) {
    Meteor.call('removeTodo', id);
  }

  update(task: Todo) {
    Meteor.call('updateTodo', task._id, task.content);
  }
  add(id: string) {
    Meteor.call('addTodo', "new task", id);
  }

}