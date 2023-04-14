import styled from "styled-components";

export const ModalWrapper = styled.div`
  background: rgba(242, 243, 245, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 698px) {
    display: block;
    width: calc(100% - 3.125rem);
    overflow-y: auto;
    overflow-x: hidden;
    left: 3.125rem;
    overscroll-behavior: contain;
  }
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 100%;
  max-width: 752px;
  padding: 2rem 3rem;
  border-radius: 5px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  position: relative;
  @media screen and (max-width: 968px) {
    width: 70%;
  }
  @media screen and (max-width: 698px) {
    width: 100%;
  }
`;

export const ModalHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  @media screen and (max-width: 698px) {
    font-size: 0.9rem;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  span {
    font-weight: bold;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const FieldLabel = styled.label`
  margin-right: 0.4rem;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

export const FieldValue = styled.span`
  font-size: 0.6rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.4rem;
  }
`;

export const CloseButtonModal = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: transparent;
  border: 0;
  font-size: 0;
  cursor: pointer;
`;
