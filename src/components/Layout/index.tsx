import { ReactNode, useState } from "react";
import { Sidebar } from "../Sidebar/";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import * as S from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <S.Layout>
      <Sidebar />
      <S.Main>
        <S.TopBar>
          <S.AvatarButton onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <img src={user?.avatarUrl} alt="User Avatar" />
          </S.AvatarButton>

          {isDropdownOpen && (
            <S.DropdownMenu>
              <Link to="/profile">Perfil</Link>
              <Link to="/" onClick={signOut}>
                Sair
              </Link>
            </S.DropdownMenu>
          )}
        </S.TopBar>

        {children}
      </S.Main>
    </S.Layout>
  );
}
