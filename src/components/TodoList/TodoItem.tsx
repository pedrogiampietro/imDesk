import React from "react";
import styled from "styled-components";

interface Props {
  text: string;
}

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

const TodoItem: React.FC<Props> = ({ text }) => {
  return (
    <Item>
      <Checkbox />
      <Text>{text}</Text>
    </Item>
  );
};

export default TodoItem;
