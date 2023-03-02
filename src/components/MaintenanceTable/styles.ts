import styled from "styled-components";

import { v } from "../../assets/styles/variables";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-radius: ${v.borderRadius};
  overflow: hidden;
`;

export const THead = styled.thead`
  position: sticky;
  z-index: 100;
`;

export const THeadTR = styled.tr`
  background: ${({ theme }) => theme.bg};
`;

export const TH = styled.th`
  font-weight: normal;
  padding: ${v.smSpacing};
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;

  :not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.bg2};
  }
  :first-of-type {
    width: 1%;
    white-space: nowrap;
  }
`;

export const TBody = styled.tbody``;

export const TBodyTR = styled.tr`
  background: ${({ theme }) => theme.bg2};
`;

export const TD = styled.td`
  padding: ${v.smSpacing};
  border: 1px solid ${({ theme }) => theme.bg2};
  font-size: 14px;

  & div {
    display: flex;
    width: 100%;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    & svg {
      cursor: pointer;

      &:hover {
        filter: opacity(0.6);
      }
    }
  }
`;
