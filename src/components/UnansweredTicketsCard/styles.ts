import styled from "styled-components";

export const CardContainer = styled.div`
  width: 20%;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.text};

    svg {
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const Title = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
  font-weight: bold;
`;

export const BorderBottom = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.primary};
  margin: 10px 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Section = styled.div`
  text-align: center;
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #000;
  border-radius: 50%;
  margin: 0 auto 10px;
`;

export const Label = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
`;

export const Value = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;
