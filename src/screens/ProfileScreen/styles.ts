import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const SideContainer = styled.div`
  flex: 1;
  padding: 20px;

  &:first-child {
    border-right: 1px solid #ccc;
  }
`;

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
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
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
