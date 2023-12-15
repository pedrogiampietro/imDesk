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

export const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;

  @media (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
  }
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  margin-top: 2rem;

  .rowOne {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 50%;
    gap: 1rem;
  }

  .rowTwo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    gap: 1rem;
  }

  @media (min-width: 280px) and (max-width: 1080px) {
    .rowOne,
    .rowTwo {
      grid-template-columns: 1fr;
    }
  }
`;
