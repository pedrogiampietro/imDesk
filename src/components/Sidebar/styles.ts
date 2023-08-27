import { Link } from "react-router-dom";
import styled from "styled-components";

import { btnReset, v } from "../../assets/styles/variables";

export const Sidebar = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)};
  background: ${({ theme }) => theme.bg};
  height: 100vh;
  padding: ${v.lgSpacing};

  position: relative;
`;

export const SidebarButton = styled.button<{
  isOpen: boolean;
  isActive: boolean;
}>`
  ${btnReset};
  position: absolute;
  top: ${v.xxlSpacing};
  right: ${({ isOpen }) => (isOpen ? `-16px` : `-40px`)};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};
  box-shadow: 0 0 4px ${({ theme }) => theme.bg3},
    0 0 7px ${({ theme }) => theme.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transform: ${({ isOpen }) => (!isOpen ? `rotate(180deg)` : `initial`)};

  svg {
    fill: ${({ isActive }) => (!isActive ? "#000" : "#fff")};
  }
`;

export const Logo = styled.div`
  width: 76px;
  cursor: pointer;
  margin: 0 auto;

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const Search = styled.div`
  background: ${({ theme }) => theme.bgAlpha};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: ${v.borderRadius};
  input {
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100%;
    outline: none;
    border: none;
    color: inherit;
    background: transparent;
  }
  display: flex;
`;

export const SearchIcon = styled.button`
  ${btnReset};
  padding: calc(${v.mdSpacing} - 2px) ${v.mdSpacing};
  display: flex;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export const LinkContainer = styled.div<{ isActive?: boolean }>`
  background: ${({ theme, isActive }) =>
    !isActive ? `transparent` : theme.bg3};
  border-radius: ${v.borderRadius};
  margin: 8px -5px;

  :hover {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
  }
`;

export const LinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px) 0;
`;

export const LinkIcon = styled.div<{ isActive: boolean }>`
  padding: ${v.smSpacing} ${v.mdSpacing};
  display: flex;

  svg {
    font-size: 20px;
    fill: ${({ isActive }) => (!isActive ? "#000" : "#fff")};
  }
`;

export const LinkLabel = styled.span<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => (!isActive ? "#000" : "#fff")};
  display: block;
  flex: 1;
  /* margin-left: ${v.smSpacing}; */
`;

export const LinkNotification = styled.div`
  font-size: 14px;
  padding: calc(${v.smSpacing} / 2) ${v.smSpacing};
  border-radius: calc(${v.borderRadius} / 2);
  background: ${({ theme }) => theme.primary};
  color: white;

  margin-right: ${v.mdSpacing};
`;

export const Theme = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
`;
export const ThemeLabel = styled.span`
  display: block;
  flex: 1;
`;
export const ThemeToggler = styled.button<{ isActive?: boolean }>`
  ${btnReset};
  margin: 0 auto;
  cursor: pointer;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};

  position: relative;
`;

export const ToggleThumb = styled.div`
  height: 18px;
  width: 18px;
  position: absolute;
  top: 1px;
  bottom: 1px;
  transition: 0.2s ease right;
  right: calc(100% - 18px - 1px);
  border-radius: 50%;
  background: ${({ theme }) => theme.bg};
`;
