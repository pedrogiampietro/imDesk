import { useNavigate } from "react-router-dom";

import * as S from "./styles";

export function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/dashboard");
  }

  return (
    <S.Container>
      <S.Title>Login</S.Title>
      <S.Form>
        <S.FormGroup>
          <S.Label>Seu usuário</S.Label>
          <S.Input
            type="text"
            placeholder="Username or email address"
            // value={username}
            onChange={(e: any) => console.log(e.target.value)}
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>Sua senha</S.Label>
          <S.Input type="password" placeholder="Password" />
        </S.FormGroup>

        <S.SubmitButton onClick={handleLogin}>Entrar</S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
