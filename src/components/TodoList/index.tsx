import React from "react";
import TodoItem from "./TodoItem";

interface Props {
  todos: { text: string }[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem key={index} text={todo.text} />
      ))}
    </div>
  );
};
