import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 98%;
  flex-direction: column;
  margin: 0 1rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
`;

export const FormGroup = styled.div``;

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
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;
