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
`;
