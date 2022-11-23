import styled from "styled-components";

import { v } from "../../assets/styles/variables";

export const Layout = styled.div`
  display: flex;
`;

export const Main = styled.main`
  padding: calc(${v.smSpacing} * 2);
  h1 {
    font-size: 14px;
  }
`;
