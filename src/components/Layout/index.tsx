import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "../Sidebar/";
import { useAuth } from "../../hooks/useAuth";
import { Breadcrumb } from "../../components/Breadcrumb";
import { RiSettings2Line, RiNotification3Line } from "react-icons/ri";
import { ChangeCompanyModal } from "../ChangeCompanyModal";

import * as S from "./styles";
import { apiClient } from "../../services/api";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isChangeCompanyModalOpen, setChangeCompanyModalOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [notifications, setNotifications] = useState<any>([]);

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
      const dropdown = document.getElementById("dropdownMenu");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const notificationDropdown = document.getElementById(
        "notificationDropdown"
      );
      if (
        notificationDropdown &&
        !notificationDropdown.contains(event.target as Node)
      ) {
        setNotificationDropdownOpen(false);
      }
    }

    if (notificationDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [notificationDropdownOpen]);

  useEffect(() => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    const fetchNotification = async () => {
      try {
        const response = await apiClient().get(`/notification/${user?.userId}`);

        setNotifications(response.data.body);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchNotification();
  }, [user]);

  const openChangeCompanyModal = () => setChangeCompanyModalOpen(true);
  const closeChangeCompanyModal = () => setChangeCompanyModalOpen(false);

  function closeDropdown() {
    setDropdownOpen(false);
  }

  // Função que lida com a troca de empresa
  const handleCompanyChange = async (companyId: string) => {
    // ...implementação da função
  };

  const toggleNotificationDropdown = () => {
    setDropdownOpen(false);
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await apiClient().post(`/notification/mark-as-read`, {
        notificationId,
      });

      setNotifications(
        notifications.map((notification: any) => {
          if (notification.id === notificationId) {
            return { ...notification, isRead: true };
          }
          return notification;
        })
      );
    } catch (error) {
      console.log(error);
      console.error("Error marking notification as read", error);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      // API call to mark all notifications as read
      await apiClient().post(`/notification/mark-all-read/${user?.userId}`);

      // Update state to reflect changes
      setNotifications(
        notifications.map((notification: any) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read", error);
    }
  };

  return (
    <S.Layout>
      <Sidebar notifyList={notifications} />
      <S.Main>
        <S.TopBar>
          <Breadcrumb paths={paths} />

          <S.CompanyProfileContainer>
            <S.CompanyInfo onClick={openChangeCompanyModal}>
              <RiSettings2Line size={20} />
              <span>{user?.currentLoggedCompany.currentLoggedCompanyName}</span>
            </S.CompanyInfo>

            <S.NotificationIcon onClick={toggleNotificationDropdown}>
              <RiNotification3Line size={24} />
              {notifications.filter((notification: any) => !notification.isRead)
                .length > 0 && (
                <S.NotificationBadge>
                  {
                    notifications.filter(
                      (notification: any) => !notification.isRead
                    ).length
                  }
                </S.NotificationBadge>
              )}
            </S.NotificationIcon>

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

            {notificationDropdownOpen && (
              <S.NotificationDropdown id="notificationDropdown">
                {notifications.filter(
                  (notification: any) => !notification.isRead
                ).length > 0 ? (
                  notifications
                    .filter((notification: any) => !notification.isRead)
                    .map((notification: any) => (
                      <S.NotificationItem key={notification.id}>
                        {notification.Ticket.User.avatarUrl ? (
                          <S.NotificationAvatar
                            src={notification.Ticket.User.avatarUrl}
                            alt="User Avatar"
                          />
                        ) : (
                          <S.Initials>
                            {user?.name
                              ?.split(" ")
                              .map((name) => name.charAt(0))
                              .join("")
                              .toUpperCase()}
                          </S.Initials>
                        )}

                        <S.NotificationContent>
                          <strong>{notification.Ticket.User.name}</strong>
                          <S.NotificationDescription>
                            {notification.Ticket.description}
                          </S.NotificationDescription>
                          <S.NotificationDate>
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </S.NotificationDate>
                        </S.NotificationContent>
                        <S.MarkAsReadButton
                          onClick={() =>
                            markNotificationAsRead(notification.id)
                          }
                        >
                          Ler
                        </S.MarkAsReadButton>
                      </S.NotificationItem>
                    ))
                ) : (
                  <S.NoNotificationsMessage>
                    Sem notificações
                  </S.NoNotificationsMessage>
                )}
                <S.MarkAllAsReadButton onClick={markAllNotificationsAsRead}>
                  Marcar tudo como lido
                </S.MarkAllAsReadButton>
              </S.NotificationDropdown>
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
