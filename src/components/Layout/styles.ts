import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
`;

export const Main = styled.main`
  flex: 1;

  h1 {
    font-size: 14px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 20px;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
`;

export const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;

  span {
    font-size: 18px;
    font-weight: bold;
    color: #7f56d8;
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

export const Initials = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7f56d8;
  font-weight: bold;
`;

export const CompanyProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
