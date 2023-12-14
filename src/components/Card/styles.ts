import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

export const CardContainer = styled.div`
  width: 280px;
  height: 220px;
  background-color: ${({ theme }) => theme.bg2};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 5px;
  transition: transform 0.3s ease-in-out;
  border-left: ${(props) => `3px solid ${props.theme.primary}`};
  overflow: auto;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    animation: ${pulse} 2s infinite;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 16px;
`;

export const CardLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 8px;
`;

export const CardValue = styled.h3<{ color: string }>`
  font-size: 20px;
  color: ${(props) => props.color};
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  ${CardContainer}:hover & {
    color: ${(props) => props.theme.primary};
  }
`;

export const CardIcon = styled.span`
  font-size: 30px;
  margin-bottom: 10px;
`;
