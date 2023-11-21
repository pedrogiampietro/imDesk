import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 98%;
  height: 100vh;
  justify-content: center;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 10px;
  background: ${({ theme }) => theme.bgLinear};
`;

export const RobotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Tooltip styles */
  &::before {
    content: "Clique para abrir um chamado!";
    position: absolute;
    bottom: 110%; /* Adjust this value as needed */
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    padding: 8px 12px;
    color: #fff;
    background: #333;
    border-radius: 4px;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
  }
`;
