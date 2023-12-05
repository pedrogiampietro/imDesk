import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineArrowDown } from "react-icons/ai";

import { btnReset, v } from "../../assets/styles/variables";

export const Sidebar = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (!isOpen ? `auto` : v.sidebarWidth)};
  background: ${({ theme }) => theme.bgLinear};
  padding: ${v.lgSpacing};
  position: relative;
  border-end-end-radius: 0.65rem;
  flex-shrink: 0;
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
  background: ${({ theme }) => theme.primary};
  margin: ${v.lgSpacing} 0;
`;

export const LinkContainer = styled.div<{
  isActive?: boolean;
  isOpen: boolean;
}>`
  width: ${({ isOpen }) => (!isOpen ? "3.125rem" : "auto")};
  border-radius: ${v.borderRadius};
  margin: 8px;
  border-left: ${({ isActive, theme }) =>
    isActive ? `4px solid ${theme.primary}` : "none"};
`;

export const LinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  padding: calc(${v.smSpacing} - 2px);

  &:hover {
    background-color: ${({ theme }) => theme.bg};
    color: #fff;
  }
`;

export const DropdownContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "auto" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, opacity 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  margin: 5px;
`;

export const ArrowIcon = styled(AiOutlineArrowDown)<{ isOpen: boolean }>`
  fill: ${({ theme }) => theme.primary};
  transition: transform 0.5s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  font-size: 16px;
`;

export const DropdownLinkStyle = styled(Link)<{
  isActive?: boolean;
}>`
  display: flex;
  align-items: center;
  text-decoration: none;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.bg : "inherit"};
  color: ${({ theme, isActive }) =>
    !isActive ? theme.text : theme.textSecondary};
  font-size: 16px;
  margin: 5px 0;
  border-radius: ${v.borderRadius};
  font-family: "Gantari", sans-serif;
  padding: calc(14px - 2px);

  &:hover {
    background-color: ${({ theme }) => theme.bg};
  }
`;

export const LinkLabel = styled.span<{ isActive: boolean; isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  color: ${({ theme, isActive }) => (isActive ? theme.primary : theme.text)};
  flex: 1;
  font-family: "Gantari", sans-serif;
`;

export const LinkIcon = styled.div<{ isActive: boolean }>`
  padding: ${v.smSpacing} ${v.smSpacing};
  display: flex;

  svg {
    font-size: 20px;
    fill: ${({ theme, isActive }) => (isActive ? theme.primary : theme.text)};
  }
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

  width: auto;
  border-radius: 6px;
  margin: 8px;
  border-left: none;
`;

export const ThemeLabel = styled.span`
  display: block;
  flex: 1;
  color: ${({ theme }) => theme.primary};

  padding: calc(8px - 2px);
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
