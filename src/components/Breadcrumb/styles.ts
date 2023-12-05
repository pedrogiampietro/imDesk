import styled from "styled-components";

export const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

export const BreadcrumbItem = styled.div`
  margin: 0 5px;

  & a {
    color: ${({ theme }) => theme.primary};
    font-family: "Poppins", sans-serif;

    &:hover {
      filter: brightness(1.8);
    }
  }
`;

export const Divider = styled.div`
  margin: 0 5px;
  color: ${({ theme }) => theme.primary};
`;
