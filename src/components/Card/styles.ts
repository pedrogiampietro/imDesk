import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 180px;
  height: 120px;
  margin: 8px;
`;

export const CardLabel = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
`;

export const CardValue = styled.h3<{ color: string }>`
  font-size: 24px;
  color: ${(props) => props.color};
  font-weight: bold;
`;
