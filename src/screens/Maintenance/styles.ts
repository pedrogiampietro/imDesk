import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1``;

export const TicketsWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 200px;
  border-radius: 10px;
`;

export const CreateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 10rem;
`;

export const Btn = styled.button<{ buynow?: string }>`
  background-color: ${({ buynow }) =>
    buynow ? "hsla(40, 72%, 50%, 1)" : "hsla(347, 49%, 46%, 1)"};
  border: 1px solid
    ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 60%, 1)" : "hsla(0, 0%, 0%, 0.4)"};
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 0.5rem 4rem;
  margin: 1rem;
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 60%, 1)" : "hsla(347, 49%, 51%, 1)"};
    ${({ buynow }) => buynow && `transform: translateY(-3px)`}
  }

  &:active {
    background-color: ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 35%, 1)" : "hsla(347, 49%, 26%, 1)"};
  }

  @media screen and (max-width: 45em) {
    padding: 1rem 1rem;
    font-size: 1.5rem;
    margin: 0.5rem;
  }
`;

export const CreateButton = styled(Btn)`
  text-decoration: none;
  background-color: hsla(189, 85%, 28%, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125),
    0 1px 1px rgba(0, 0, 0, 0.05);
  border-bottom-width: 0.5rem;

  &:hover {
    background-color: hsla(189, 85%, 32%, 1);
  }

  &:active {
    border-bottom-width: 0.1rem;
    border-top-width: 0.5rem;
  }
`;
