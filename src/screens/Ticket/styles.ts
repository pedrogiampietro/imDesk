import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1``;

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

export const Label = styled.label``;

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
