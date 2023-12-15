import styled, { css } from "styled-components";

export const cardStyle = css`
  padding: 1rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.primary};
`;

export const EarningsContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyle}
  padding: 2rem 0 0 0;
`;

export const TopContainer = styled.div``;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;

  h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme.primary};
  }
  h4 {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Growth = styled.div`
  background-color: #333;
  padding: 0.3rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.text};
    span {
      color: #000;
    }
  }
`;

export const Chart = styled.div`
  height: 70%;

  .recharts-default-tooltip {
    background-color: ${({ theme }) => theme.primaryDark} !important;
    border-color: #000 !important;
  }
`;
