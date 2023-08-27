// ProfileScreen.tsx

import { useState } from "react";
import * as S from "./styles";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../constants/auth";
import { setStorageModel } from "../../utils/storage";

import { toast } from "react-toastify";

export function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const { user } = useAuth();

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const objectURL = URL.createObjectURL(file);
      setAvatarPreview(objectURL);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await apiClient().put(
        "/account/user/update-avatar",
        formData,
        {
          params: {
            userId: user?.userId,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.updatedUser) {
        const updatedUser = {
          ...user,
          avatarUrl: response.data.updatedUser.avatarUrl,
        };

        setStorageModel(auth.USER, JSON.stringify(updatedUser));
      }

      toast.success("Sucesso! Sua categoria foi adicionada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(
        "Error! Parece que houve um problema ao atualizar seu avatar!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <Layout>
      <S.ProfileContainer>
        <S.SideContainer>
          <S.Form onSubmit={handleSubmit}>
            <S.AvatarInput>
              <label>
                {avatarPreview || user?.avatarUrl ? (
                  <S.AvatarPreview
                    src={avatarPreview ? avatarPreview : user?.avatarUrl}
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
                <S.AvatarUpload
                  type="file"
                  name="avatar"
                  onChange={handleAvatarChange}
                />
              </label>
            </S.AvatarInput>

            <S.SubmitButton type="submit">Atualizar Avatar</S.SubmitButton>
          </S.Form>
        </S.SideContainer>

        <S.SideContainer>
          <S.Form onSubmit={handleSubmit}>
            <S.Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Atualize seu e-mail"
            />

            <S.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Atualize sua senha"
            />

            <S.SubmitButton type="submit">Atualizar Senha</S.SubmitButton>
          </S.Form>
        </S.SideContainer>
      </S.ProfileContainer>
    </Layout>
  );
}
