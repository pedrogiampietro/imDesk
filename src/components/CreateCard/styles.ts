import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
`;

export const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  margin-bottom: 1rem;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  flex-grow: 1;

  &:disabled {
    background: #f3f4f6;
  }
`;

export const TagInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Tag = styled.span`
  background-color: #e1e8ed;
  color: #333;
  border-radius: 2px;
  padding: 5px 8px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-size: 14px;
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #700;
  cursor: pointer;
  font-size: 14px;
  margin-left: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  overflow-y: auto;
  resize: vertical;
  outline: none;
  font-family: Poppins;
  font-weight: 500;
  color: #333;
  border: 1px solid hsl(0, 0%, 80%);
  border-bottom: 1px dashed #7f56d8;
  padding: 0.5rem;
  background-color: #fff;
  margin: 0 0 1.2rem 0;
  font-size: 1rem;
  line-height: 1.5;
`;

export const CreateButton = styled.button<{ isActive: boolean }>`
  background: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};
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
  color: #7f56d8;
  border: 2px solid #7f56d8;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(84, 105, 212, 0.1);
  }
`;
