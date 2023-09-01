import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

interface Props {
  onAdd: (text: string) => void;
}

const Form = styled.form`
  display: flex;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #6095aa;
  color: white;
  border-radius: 5px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2b667d;
  }
`;

export const AddTodo: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Adicione uma tarefa..."
      />
      <Button type="submit">
        <FaPlus fill="white" />
      </Button>
    </Form>
  );
};
