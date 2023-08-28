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
  border-radius: 12px;
  outline: none;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ isActive }) => (isActive ? "#FFF" : "#000")};
  padding: 1rem 3rem;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
    color: #fff;
    transform: translateY(-2px);
    opacity: 0.9;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(58, 123, 255, 0.6);
  }

  & svg {
    margin-left: 0.5rem;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PreviewImageContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const DeleteIcon = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:before {
    content: "×";
  }

  &:hover {
    background-color: #ff4d4d;
  }
`;

export const FileInput = styled.div`
  position: relative;
`;

export const FileLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: transparent;
  color: #6095aa;
  border: 2px solid #6095aa;
  border-radius: 5px;
  /* font-size: 24px; */
  cursor: pointer;

  &:hover {
    background-color: rgba(84, 105, 212, 0.1);
  }
`;
