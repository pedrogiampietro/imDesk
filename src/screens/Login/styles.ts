import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  background-color: #001334;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 28px;
  font-family: Poppins, sans-serif;
  margin: 0 0 2rem;
  text-align: center;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 0 2rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 25rem;
  height: 25rem;
  border: 1px solid white;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #333;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export const Label = styled.label`
  color: #fff;
  font-size: 16px;
  font-family: Poppins, sans-serif;
`;

export const SubmitButton = styled.button`
  background: #e90d63;
  color: #fff;

  font-size: 1em;
  margin: 1em;
  padding: 1rem 5em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  &:hover {
    filter: opacity(0.7);
    transition: background-color 3s linear;
  }
`;
