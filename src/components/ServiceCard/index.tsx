import React from "react";
import styled from "styled-components";
import { FaClock, FaExclamationCircle } from "react-icons/fa";

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  width: 250px;
`;

const CardHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  svg {
    margin-right: 10px;
  }
`;

export function ServiceCard({ all, today, tomorrow, after }: any) {
  return (
    <CardContainer>
      <CardHeader>Vencimento Atendimento</CardHeader>
      <CardItem>
        <FaClock color="#34A853" />
        <span>Todos: {all}</span>
      </CardItem>
      <CardItem>
        <FaExclamationCircle color="#FFC107" />
        <span>Hoje: {today}</span>
      </CardItem>
      <CardItem>
        <FaExclamationCircle color="#9C27B0" />
        <span>Amanhã: {tomorrow}</span>
      </CardItem>
      <CardItem>
        <FaExclamationCircle color="#4CAF50" />
        <span>Depois: {after}</span>
      </CardItem>
    </CardContainer>
  );
}
