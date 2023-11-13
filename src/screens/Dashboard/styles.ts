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
