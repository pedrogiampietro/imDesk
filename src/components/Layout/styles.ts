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
  background: ${({ theme }) => theme.bgLinear};
  margin-bottom: 1rem;
`;

export const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    margin-left: 10px;
  }
  svg {
    font-size: 20px;
    fill: ${({ theme }) => theme.primary};
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
  margin-right: 1rem;
`;

export const CompanyProfileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
export const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 1.5rem;

  & svg {
    fill: ${({ theme }) => theme.primary};
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 50%;
  padding: 4px;
  min-width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.65rem;
  font-weight: bold;
`;

export const NotificationDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  width: 300px;
  z-index: 20;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationAvatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const NotificationContent = styled.div`
  flex: 1;
`;

export const NotificationDescription = styled.div`
  font-size: 0.9rem;
`;

export const NotificationDate = styled.div`
  font-size: 0.8rem;
  color: grey;
`;

export const MarkAsReadButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
`;

export const MarkAllAsReadButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  background: none;
  border: none;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
  color: blue;
`;

export const NoNotificationsMessage = styled.div`
  padding: 10px;
  text-align: center;
  color: gray;
`;
