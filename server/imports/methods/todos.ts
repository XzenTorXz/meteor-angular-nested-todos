import { Meteor } from 'meteor/meteor';

import { Todos } from '../../../imports/collections/todos';

Meteor.methods({
  addTodo(content: string, parent: string) {
    Todos.insert({
      content,
      parent
    });
  },
  removeTodo(_id: string) {
    Todos.remove({
      _id
    });
    //TODO: get all children and delete recursive
    Todos.remove({
      parent: _id
    });
  },
  updateTodo(_id: string, content: string, checked: boolean = false, today: boolean = false) {
    Todos.update(_id, {
        $set: { 
          content: content,
          checked: checked,
          today: today
        }
    })
  }
})
