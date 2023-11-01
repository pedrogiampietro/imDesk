import { useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import imDeskLogo from "../../assets/img/imdesk-logo.png";

import {
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";

import { ThemeContext } from "./../../App";

import * as S from "./styles";
import { Tooltip } from "../Tooltip";

export function Sidebar() {
  const searchRef = useRef(null);
  const { signOut, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setTheme, theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "imDesk@Sidebar",
    "open"
  );
  const { pathname } = useLocation();

  const searchClickHandler = () => {
    // if (!sidebarOpen) {
    // 	setSidebarOpen(true)
    // 	// searchRef.current.focus();
    // } else {
    // 	// search functionality
    // }
  };

  const toggleTheme = () => {
    setTheme((p) => (p === "light" ? "dark" : "light"));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((p: any) => !p);
  };

  const secondaryLinksArray = [
    {
      label: "Settings",
      icon: <AiOutlineSetting />,
      to: "/settings",
      requiresTech: true,
    },
    {
      label: "Logout",
      icon: <MdLogout />,
      to: "/login",
      func: signOut,
      requiresTech: true,
    },
  ];

  function DropdownMenu({ icon, label, to, subLinks }: any) {
    const { pathname } = useLocation();
    return (
      <S.LinkContainer
        key={label}
        isActive={pathname === to}
        isOpen={sidebarOpen}
      >
        <S.LinkStyle to="" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <S.LinkIcon isActive={theme === "dark"}>{icon}</S.LinkIcon>
          <S.LinkLabel isActive={theme === "dark"}>{label}</S.LinkLabel>
        </S.LinkStyle>
        {isDropdownOpen &&
          subLinks.map((subLink: any) => (
            <S.DropdownLinkStyle key={subLink.label} to={subLink.to}>
              {subLink.label}
            </S.DropdownLinkStyle>
          ))}
      </S.LinkContainer>
    );
  }

  return (
    <S.Sidebar isOpen={sidebarOpen}>
      <>
        <S.SidebarButton
          isOpen={sidebarOpen}
          onClick={handleToggleSidebar}
          isActive={theme === "dark"}
        >
          <AiOutlineLeft />
        </S.SidebarButton>
      </>
      <S.Logo>
        <img src={imDeskLogo} alt="logo" />
      </S.Logo>
      {/* <S.Search
        onClick={searchClickHandler}
        style={!sidebarOpen ? { width: `fit-content` } : {}}
      >
        <S.SearchIcon>
          <AiOutlineSearch />
        </S.SearchIcon>
        <input
          ref={searchRef}
          placeholder="Search"
          style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
        />
      </S.Search> */}
      <S.Divider />
      {linksArray.map(
        ({ icon, label, notification, to, requiresTech, subLinks }) =>
          (!requiresTech || (requiresTech && user?.isTechnician)) &&
          (subLinks ? (
            <DropdownMenu
              key={label}
              label={label}
              subLinks={subLinks}
              to={to}
              icon={icon}
            />
          ) : (
            <S.LinkContainer
              key={label}
              isActive={pathname === to}
              isOpen={sidebarOpen}
            >
              {!sidebarOpen ? (
                <Tooltip text={label}>
                  <S.LinkStyle to={to} style={{ width: `fit-content` }}>
                    <S.LinkIcon isActive={theme === "dark"}>{icon}</S.LinkIcon>
                  </S.LinkStyle>
                </Tooltip>
              ) : (
                <S.LinkStyle to={to}>
                  <S.LinkIcon isActive={theme === "dark"}>{icon}</S.LinkIcon>
                  <S.LinkLabel isActive={theme === "dark"}>{label}</S.LinkLabel>
                  {!!notification && (
                    <S.LinkNotification>{notification}</S.LinkNotification>
                  )}
                </S.LinkStyle>
              )}
            </S.LinkContainer>
          ))
      )}
      <S.Divider />
      {secondaryLinksArray.map(
        ({ icon, label, func, to, requiresTech }) =>
          (!requiresTech || (requiresTech && user?.isTechnician)) && (
            <S.LinkContainer key={label} isOpen={sidebarOpen}>
              <S.LinkStyle
                to={`${to}`}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
                onClick={func}
              >
                <S.LinkIcon isActive={theme === "dark"}>{icon}</S.LinkIcon>
                {sidebarOpen && (
                  <S.LinkLabel isActive={theme === "dark"}>{label}</S.LinkLabel>
                )}
              </S.LinkStyle>
            </S.LinkContainer>
          )
      )}

      <S.Divider />
      <S.Theme>
        {sidebarOpen && <S.ThemeLabel>Dark Mode</S.ThemeLabel>}
        <S.ThemeToggler isActive={theme === "dark"} onClick={toggleTheme}>
          <S.ToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
        </S.ThemeToggler>
      </S.Theme>
    </S.Sidebar>
  );
}

const linksArray = [
  {
    label: "Inicio",
    icon: <AiOutlineHome />,
    to: "/dashboard",
    notification: 0,
  },
  {
    label: "Estatisticas",
    icon: <MdOutlineAnalytics />,
    to: "/statistics",
    notification: 0,
    subLinks: [
      {
        label: "Relátorio OS",
        to: "/statistics/os",
      },
      {
        label: "Sub Item 2",
        to: "/sub-item-2",
      },
    ],
  },
  // {
  //   label: "Manutenção",
  //   icon: <MdOutlineComputer />,
  //   to: "/maintenance",
  //   notification: 0,
  // },
  {
    label: "Tickets",
    icon: <BsPeople />,
    to: "/tickets",
    notification: 0,
  },
  {
    label: "Fornecedores",
    icon: <HiOutlineNewspaper />,
    to: "/providers",
    notification: 0,
    requiresTech: true,
  },
  {
    label: "Estoque",
    icon: <BsHouse />,
    to: "/deposit",
    notification: 0,
    requiresTech: true,
  },
  {
    label: "Inventário",
    icon: <MdOutlineInventory />,
    to: "/inventory",
    notification: 0,
    requiresTech: true,
  },
];
