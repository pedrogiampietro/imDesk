// CardButton.tsx
import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 180px;
  height: 120px;
  margin: 8px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardLabel = styled.p`
  font-size: 18px;
  color: #333;
`;
