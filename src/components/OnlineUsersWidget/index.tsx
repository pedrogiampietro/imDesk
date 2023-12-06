import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaUsers, FaTimes } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { apiClient } from "../../services/api";

const WidgetIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;
  cursor: pointer;
`;

const Sidebar = styled.div<{ isVisible: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 50%; // Definindo a altura para 50% da tela
  width: 20%; // Mantendo a largura em 20%
  background-color: white;
  box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.5);
  transform: translateY(${(props) => (props.isVisible ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  overflow-y: auto; // Barra de rolagem para conteúdo extenso
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const OnlineIndicator = styled.span`
  height: 10px;
  width: 10px;
  background-color: #34a853;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  // Estilização adicional para o nome do usuário
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export function OnlineUsersWidget() {
  const { user } = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarVisible(false);
      }
    }

    // Adiciona listener apenas se o Sidebar estiver visível
    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarVisible]);

  useEffect(() => {
    async function fetchOnlineUsers() {
      try {
        const response = await apiClient().get("/account/users/online");
        setOnlineUsers(response.data.body);
      } catch (err) {
        console.error("Erro ao buscar usuários online", err);
      }
    }

    if (user?.isTechnician) {
      fetchOnlineUsers();
    }
  }, [user]);

  if (!user?.isTechnician) {
    return null;
  }

  return (
    <>
      <WidgetIcon onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
        <FaUsers size={30} />
      </WidgetIcon>
      <Sidebar ref={sidebarRef} isVisible={isSidebarVisible}>
        <CloseButton onClick={() => setIsSidebarVisible(false)}>
          <FaTimes size={20} />
        </CloseButton>
        {onlineUsers.map((u: any) => (
          <UserItem key={u.id}>
            <OnlineIndicator /> {/* Indicador de usuário online */}
            <UserName>{u.name}</UserName>
          </UserItem>
        ))}
      </Sidebar>
    </>
  );
}
