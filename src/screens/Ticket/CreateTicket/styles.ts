import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => (!isActive ? "#000" : "#fff")};
`;

export const Input = styled.input``;

export const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  overflow-y: auto;
  resize: none;
  outline: none;
  font-family: Poppins;
  font-weight: 500;
  color: #333;
  border: 1px solid hsl(0, 0%, 80%);
  border-bottom: 1px dashed #5c5c5c;
  padding: 0 0 0.2rem 0;
  background-color: rgb(230, 230, 230);
  margin: 0 0 1.2rem 0;
`;

export const CreateTicketButton = styled.button<{ isActive: boolean }>`
  background: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};
  border: 1px solid #000;
  border-radius: 12px; // bordas ligeiramente mais arredondadas
  outline: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ isActive }) => (isActive ? "#FFF" : "#000")};
  padding: 1rem 3rem;
  cursor: pointer;
  font-size: 0.8rem; // um pouco maior para melhor legibilidade
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out; // transição para todos os estados
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // adicionando uma sombra suave

  &:hover {
    background-color: ${({ theme }) =>
      theme.primaryDark}; // tom mais escuro no hover
    color: #fff;
    transform: translateY(-2px); // elevando ligeiramente o botão
    opacity: 0.9;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); // sombra mais pronunciada no hover
  }

  &:active {
    transform: translateY(1px); // efeito de pressionar o botão
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1); // sombra menos intensa ao pressionar
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(58, 123, 255, 0.6); // glow azul ao focar para acessibilidade
  }

  & svg {
    margin-left: 0.5rem; // ligeiro ajuste no espaço do ícone
  }
`;
