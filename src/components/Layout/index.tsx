import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar/";
import { useAuth } from "../../hooks/useAuth";
import { Breadcrumb } from "../../components/Breadcrumb";
import { IoBusinessOutline } from "react-icons/io5";
import { ChangeCompanyModal } from "../ChangeCompanyModal";

import * as S from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isChangeCompanyModalOpen, setChangeCompanyModalOpen] = useState(false);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Aqui você pode usar uma referência ao elemento do dropdown, se preferir,
      // ou usar um seletor para identificar se o clique foi fora
      const dropdown = document.getElementById("dropdownMenu");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        closeDropdown(); // Fecha o dropdown se clicar fora
      }
    }

    // Adiciona o ouvinte quando o dropdown estiver aberto
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Remove o ouvinte quando o componente desmontar ou o dropdown estiver fechado
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const openChangeCompanyModal = () => setChangeCompanyModalOpen(true);
  const closeChangeCompanyModal = () => setChangeCompanyModalOpen(false);

  function closeDropdown() {
    setDropdownOpen(false);
  }

  // Função que lida com a troca de empresa
  const handleCompanyChange = async (companyId: string) => {
    // ...implementação da função
  };

  return (
    <S.Layout>
      <Sidebar />
      <S.Main>
        <S.TopBar>
          <Breadcrumb paths={paths} />

          <S.CompanyProfileContainer>
            <S.CompanyInfo onClick={openChangeCompanyModal}>
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
              <S.DropdownMenu id="dropdownMenu">
                <Link to="/profile">Perfil</Link>
                <Link to="/" onClick={signOut}>
                  Sair
                </Link>
              </S.DropdownMenu>
            )}
          </S.CompanyProfileContainer>
        </S.TopBar>

        {children}
        <ChangeCompanyModal
          isOpen={isChangeCompanyModalOpen}
          onClose={closeChangeCompanyModal}
          onCompanyChange={handleCompanyChange}
        />
      </S.Main>
    </S.Layout>
  );
}
