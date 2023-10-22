import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar/";
import { useAuth } from "../../hooks/useAuth";
import { Breadcrumb } from "../../components/Breadcrumb";
import { IoBusinessOutline } from "react-icons/io5";

import * as S from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { user, signOut } = useAuth();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const paths = [
    { name: "Home", url: "/" },
    ...pathnames.map((value, index) => ({
      name: value.charAt(0).toUpperCase() + value.slice(1),
      url: "/" + pathnames.slice(0, index + 1).join("/"),
    })),
  ];

  return (
    <S.Layout>
      <Sidebar />
      <S.Main>
        <S.TopBar>
          <Breadcrumb paths={paths} />

          <S.CompanyProfileContainer>
            <S.CompanyInfo>
              <IoBusinessOutline size={20} />
              <span>{user?.currentLoggedCompany.currentLoggedCompanyName}</span>
            </S.CompanyInfo>
            <S.AvatarButton onClick={() => setDropdownOpen(!isDropdownOpen)}>
              {user?.avatarUrl ? (
                <img src={user?.avatarUrl} alt="User Avatar" />
              ) : (
                <S.Initials>
                  {user?.name
                    ?.split(" ")
                    .map((name) => name.charAt(0))
                    .join("")
                    .toUpperCase()}
                </S.Initials>
              )}
            </S.AvatarButton>

            {isDropdownOpen && (
              <S.DropdownMenu>
                <Link to="/profile">Perfil</Link>
                <Link to="/" onClick={signOut}>
                  Sair
                </Link>
              </S.DropdownMenu>
            )}
          </S.CompanyProfileContainer>
        </S.TopBar>

        {children}
      </S.Main>
    </S.Layout>
  );
}
