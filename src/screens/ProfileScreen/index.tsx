import { useState, useEffect, useRef } from "react";
import * as S from "./styles";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../constants/auth";
import { setStorageModel } from "../../utils/storage";
import { toast } from "react-toastify";
import { base64ToBlob } from "../../utils";
import SignatureCanvas from "react-signature-canvas";

export function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [signatureUrl, setSignatureUrl] = useState("");

  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId ||
      !user.currentLoggedCompany.currentLoggedCompanyName
    ) {
      return;
    }

    const fetchSignature = async () => {
      try {
        const response = await apiClient().get("/account/user/get-signature", {
          params: { userId: user?.userId },
        });

        if (response.data.body) {
          setSignatureUrl(response.data.body);
        }
      } catch (error) {
        console.error(
          "Houve um erro ao buscar a assinatura do usuário:",
          error
        );
      }
    };

    fetchSignature();
  }, []);

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

  const handleSignatureSubmit = async () => {
    if (!sigCanvas.current) return;

    const signatureData = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    const blob = base64ToBlob(signatureData, "image/png");
    const file = new File([blob], "signature.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("signature", file);

    try {
      await apiClient().put("/account/user/update-signature", formData, {
        params: {
          userId: user?.userId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erro ao enviar a assinatura:", error);
    }
  };

  return (
    <Layout>
      <S.ProfileContainer>
        <S.Header>
          <h1>Meu Perfil</h1>
        </S.Header>

        <S.Content>
          <S.SideContainer>
            <S.AvatarSection>
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
            </S.AvatarSection>
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
        </S.Content>

        <S.SignatureSection>
          <div>
            {signatureUrl ? (
              <div>
                <h3>Assinatura:</h3>
                <img src={signatureUrl} alt="Assinatura do usuário" />
              </div>
            ) : (
              <S.SignatureField>
                <p>Assinatura:</p>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "signatureCanvas",
                  }}
                />
                <div>
                  <S.Button onClick={() => sigCanvas.current?.clear()}>
                    Limpar
                  </S.Button>
                  <S.Button onClick={handleSignatureSubmit}>
                    Salvar Assinatura
                  </S.Button>
                </div>
              </S.SignatureField>
            )}
          </div>
        </S.SignatureSection>
      </S.ProfileContainer>
    </Layout>
  );
}
