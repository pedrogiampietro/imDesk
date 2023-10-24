import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";

export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

export const Header = styled.header`
  background-color: #7f56d8;

  padding: 20px 0;
  text-align: center;
  font-size: 1.5rem;

  & h1 {
    color: #ffffff;
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

export const SideContainer = styled.div`
  flex: 1;
  padding: 20px;

  &:first-child {
    border-right: 1px solid #ccc;
  }
`;

export const AvatarSection = styled.section``;

export const SignatureSection = styled.section``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AvatarInput = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  label {
    position: relative;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    input[type="file"] {
      display: none;
    }
  }
`;

export const AvatarPreview = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarUpload = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SubmitButton = styled.button`
  width: 150px;
  height: 40px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #7f56d8;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c3aff0;
  }

  &:focus {
    outline: none;
  }
`;

export const Initials = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7f56d8;
  font-weight: bold;
`;
export const SignatureField = styled.div`
  margin: 20px 0;
  p {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  & .signatureCanvas {
    background-color: #fff;
  }
`;

export const SignatureCanvasStyled = styled(SignatureCanvas)`
  border: 1px solid #000;
  border-radius: 5px;
`;

export const Button = styled.button`
  display: inline-block;
  background-color: #7f56d8;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 10px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c3aff0;
  }
`;
