import React, { useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../services/api";
import { FaTrash } from "react-icons/fa";

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #f9f9f9;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 10px;
  transform: scale(1.5);
`;

const Text = styled.span`
  font-size: 1.2em;
`;

const DeleteIcon = styled(FaTrash)`
  margin-left: auto;
  cursor: pointer;
  color: red;
`;

interface Props {
  id: string;
  text: string;
  completed: boolean;
  onUpdate: (updatedTodo: {
    id: string;
    description: string;
    completed: boolean;
  }) => void;
}

const TodoItem: React.FC<Props> = ({ id, text, completed, onUpdate }) => {
  const [isChecked, setChecked] = useState(completed);

  const handleCheckboxChange = async () => {
    const newCheckedStatus = !isChecked;
    try {
      const response = await apiClient().put(`/todoo/${id}`, {
        completed: newCheckedStatus,
      });

      if (response.status === 200) {
        setChecked(newCheckedStatus);
        const updatedTodo = response.data.body;
        onUpdate(updatedTodo);
      }
    } catch (error) {
      console.error("Erro ao atualizar o todo", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiClient().delete(`/todoo/${id}`);

      if (response.status === 200) {
      }
    } catch (error) {
      console.error("Erro ao excluir o todo", error);
    }
  };

  return (
    <Item>
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <Text>{text}</Text>
      <DeleteIcon onClick={handleDelete} />
    </Item>
  );
};

export default TodoItem;
