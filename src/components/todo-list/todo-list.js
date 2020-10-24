import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({
  todos,
  onDeleted,
  onImportant,
  onDone
}) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          onImportant={() => onImportant(id)}
          onDone={() => onDone(id)}
          {...itemProps}
          onDeleted={() => onDeleted(id)} {...itemProps } />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
