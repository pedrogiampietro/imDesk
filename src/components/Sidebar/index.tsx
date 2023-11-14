import { useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import imDeskLogo from "../../assets/img/imdesk-logo.png";

import { AiOutlineHome, AiOutlineLeft, AiOutlineSetting } from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import { HiOutlineNewspaper } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import {
  MdOutlineInventory,
  MdOutlineIntegrationInstructions,
} from "react-icons/md";

import { ThemeContext } from "./../../App";

import * as S from "./styles";
import { Tooltip } from "../Tooltip";

export function Sidebar() {
  const { signOut, user } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { setTheme, theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "imDesk@Sidebar",
    "open"
  );
  const { pathname } = useLocation();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((prev: any) => !prev);
  };

  const handleDropdown = (label: any) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const secondaryLinksArray = [
    {
      label: "Logout",
      icon: <MdLogout />,
      to: "/login",
      func: signOut,
      requiresTech: false,
    },
  ];

  function DropdownMenu({ icon, label, to, subLinks, sidebarOpen }: any) {
    const isActiveDropdownItem = (subLinkTo: any) => pathname === subLinkTo;
    const isDropdownActive = activeDropdown === label;

    const handleDropdownClick = (e: any) => {
      e.stopPropagation();
      handleDropdown(label);
    };

    return (
      <S.LinkContainer isOpen={sidebarOpen}>
        {!sidebarOpen ? (
          <Tooltip text={label}>
            <S.LinkStyle to={to} style={{ width: `fit-content` }}>
              <S.LinkIcon isActive={theme === "dark"}>{icon}</S.LinkIcon>
            </S.LinkStyle>
          </Tooltip>
        ) : (
          <S.LinkStyle to="#" onClick={handleDropdownClick}>
            <S.LinkIcon isActive={theme === "dark"}>{icon}</S.LinkIcon>
            <S.LinkLabel isActive={theme === "dark"} isOpen={sidebarOpen}>
              {label}
            </S.LinkLabel>
            <S.ArrowIcon isOpen={isDropdownActive} />
          </S.LinkStyle>
        )}
        <S.DropdownContent isOpen={isDropdownActive}>
          {subLinks.map((subLink: any) => (
            <S.DropdownLinkStyle
              key={subLink.label}
              to={subLink.to}
              onClick={(e) => e.stopPropagation()}
              isActive={isActiveDropdownItem(subLink.to)}
            >
              {subLink.label}
            </S.DropdownLinkStyle>
          ))}
        </S.DropdownContent>
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
              sidebarOpen={sidebarOpen}
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
                  <S.LinkLabel isActive={theme === "dark"} isOpen={sidebarOpen}>
                    {label}
                  </S.LinkLabel>
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
                  <S.LinkLabel isActive={theme === "dark"} isOpen={sidebarOpen}>
                    {label}
                  </S.LinkLabel>
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
    label: "Estatisticas",
    icon: <MdOutlineAnalytics />,
    to: "/statistics",
    notification: 0,
    subLinks: [
      {
        label: "Reports",
        to: "/statistics",
      },
      {
        label: "Relátorio OS",
        to: "/statistics/os",
      },
    ],
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
  {
    label: "Configurações",
    icon: <AiOutlineSetting />,
    to: "/settings",
    notification: 0,
    requiresTech: true,
    subLinks: [
      {
        label: "Criação de Usuário",
        to: "/settings/create-user",
      },
      {
        label: "Criação de Localização",
        to: "/settings/create-location",
      },
      {
        label: "Criação de Prioridade",
        to: "/settings/create-priority",
      },
      {
        label: "Criação de Tipo",
        to: "/settings/create-type",
      },
      {
        label: "Criação de Categoria",
        to: "/settings/create-category",
      },
    ],
  },
  {
    label: "Integração - MV",
    icon: <MdOutlineIntegrationInstructions />,
    to: "/mv",
    notification: 0,
    requiresTech: true,
    subLinks: [
      {
        label: "Atendimentos por Localidade",
        to: "/mv/services-by-locations",
      },
      {
        label: "Consumo de Medicamentos (HMMR)",
        to: "/mv/consumed-medicaments-hmmr",
      },
    ],
  },
];
