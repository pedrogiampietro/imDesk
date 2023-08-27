import styled from "styled-components";

import { v } from "../../assets/styles/variables";

export const Layout = styled.div`
  display: flex;
`;

export const Main = styled.main`
  width: 100%;
  padding: calc(${v.smSpacing} * 2);

  h1 {
    font-size: 14px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  background-color: #f6f6f6;
  border-bottom: 1px solid #ddd;
`;

export const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  span {
    font-size: 18px;
    color: #333;
    margin-left: 10px;
  }
`;

export const AvatarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 65px;
  right: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;

  a {
    display: block;
    padding: 10px 20px;
    color: #333;
    text-decoration: none;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;
