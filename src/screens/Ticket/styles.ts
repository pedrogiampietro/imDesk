import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Title = styled.h1``;

export const TicketsWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  /* margin-top: 5rem; */
  border-radius: 10px;
`;

export const Wrapper = styled.div`
  position: fixed;
  right: -100%;
  top: 0;
  width: 35vw;
  height: 100vh;
  background: ${({ theme }) => theme.bg2};
  box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;

  &.active {
    right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
