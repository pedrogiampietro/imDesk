import styled from "styled-components";

export const CardContainer = styled.div`
  width: 180px;
  height: 120px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 16px;
  background-color: white;
`;

export const CardLabel = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
`;

export const CardValue = styled.h3<{ color: string }>`
  font-size: 24px;
  color: ${(props) => props.color};
  font-weight: bold;
`;
