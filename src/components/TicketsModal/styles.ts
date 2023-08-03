import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  width: 48%;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #ff6347;
  margin-bottom: 5px;
  & > svg {
    font-size: 22px;
    margin-right: 0.65rem;
  }
`;

export const InfoTitle = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const InfoContent = styled.p`
  color: #333;
`;

export const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: lightgray;
  }
`;
