import styled from "styled-components";

const colors = {
  primary: "#7F56D8",
  primaryDark: "#0056b3",
  lightGrey: "#f4f4f4",
  darkGrey: "#333",
  borderGrey: "#ccc",
  white: "#fff",
  red: "#ff6347",
};

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  padding: 30px 40px;
  box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.3);
  display: flex;
`;

export const LeftSide = styled.div`
  flex: 50%;
  padding-right: 20px;
  border-right: 1px solid ${colors.borderGrey};
  overflow-y: auto;

  > h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: ${colors.darkGrey};
  }

  > span {
    display: block;
    margin-bottom: 20px;
    font-size: 18px;
    color: ${colors.primaryDark};
  }

  // Seção do chat
  > div.chat {
    background: ${colors.lightGrey};
    padding: 15px;
    border-radius: 15px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
  }
`;

export const RightSide = styled.div`
  flex: 50%;
  padding-left: 20px;

  overflow: auto;
  overflow-y: scroll;

  > p.info {
    font-size: 16px;
    color: ${colors.darkGrey};
    margin-bottom: 20px;
  }
`;

export const WelcomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  &:hover {
    color: ${colors.red};
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  color: ${colors.darkGrey};
  font-size: 24px;
`;

export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const InfoItem = styled.div`
  flex: 1;
  background: ${colors.lightGrey};
  padding: 15px;
  border-radius: 15px;
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
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

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fff;
  border-radius: 8px; // Bordas mais arredondadas

  &:hover {
    border-color: #a0aec0;
  }

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const StyledSelect = styled.select`
  border: 1px solid #e2e8f0;
  padding: 8px 12px;
  border-radius: 4px;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
  border-radius: 8px; // Bordas mais arredondadas

  &:focus {
    border-color: #a0aec0;
    outline: none;
  }

  &:hover {
    border-color: #a0aec0;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical; // permite o redimensionamento vertical do textarea
  margin-bottom: 10px;
  &:focus {
    border-color: #7f56d8;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  display: inline-block;
  background-color: #7f56d8;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 8px; // Bordas mais arredondadas

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 12px;
  background-color: #7f56d8;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c3aff0;
  }
`;

export const ConversationContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 340px;
  overflow-y: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
`;

export const Message = styled.div<{ isTech: boolean }>`
  position: relative;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  background-color: ${(props) => (props.isTech ? "#dcf6c7" : "#dfd8cf")};
  align-self: ${(props) => (props.isTech ? "flex-start" : "flex-end")};
  max-width: 80%;
  word-break: break-word;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Timestamp = styled.span`
  position: absolute;
  top: 27px;
  font-size: 0.7rem;
  color: #555;
`;

export const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 15px;

  & > input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  & > button {
    padding: 10px 20px;
    background-color: #7f56d8;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #c3aff0;
    }
  }
`;

export const UsedItemsHistory = styled.div`
  margin: 20px 0;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #7f56d8;
    color: white;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;
