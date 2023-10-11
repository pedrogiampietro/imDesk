import React, { useState } from "react";
import TodoItem from "./TodoItem";

interface Props {
  todos: { id: string; description: string; completed: boolean }[];
  setTodos: any;
}

export const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [key, setKey] = useState(0);

  const updateTodoInList = (updatedTodo: any) => {
    setTodos((prevTodos: any) =>
      prevTodos.map((todo: any) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div key={key}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.description}
          completed={todo.completed}
          onUpdate={updateTodoInList}
        />
      ))}
    </div>
  );
};
