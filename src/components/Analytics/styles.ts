import styled, { css } from "styled-components";

export const cardStyle = css`
  padding: 1rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.primary};
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (min-width: 280px) and (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
`;

export const Analytic = styled.div`
  ${cardStyle}
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.text};
    svg {
      color: ${({ theme }) => theme.text};
    }
  }

  @media (min-width: 280px) and (max-width: 1080px) {
  }
`;

export const Content = styled.div`
  & h5,
  h2 {
    color: ${({ theme }) => theme.primary};
  }
`;

export const Logo = styled.div`
  background-color: #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  svg {
    font-size: 1.5rem;
    fill: ${({ theme }) => theme.primary};
  }
`;
