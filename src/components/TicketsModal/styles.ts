import styled from "styled-components";

const colors = {
  primary: "#7F56D8",
  primaryDark: "#c3aff0",
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
  background-color: ${({ theme }) => theme.bg2};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
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

  & p {
    color: ${({ theme }) => theme.primary};

    & strong {
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;

  & > svg {
    font-size: 22px;
    margin-right: 2.65rem;
    fill: ${({ theme }) => theme.text};
  }

  &:hover {
    color: ${colors.red};
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
`;

export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5625rem;

  & h1 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 1rem;
  }
`;

export const InfoItem = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg2};
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
    fill: ${({ theme }) => theme.primary};
  }
`;

export const InfoTitle = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.primary};
`;

export const InfoContent = styled.p`
  color: ${({ theme }) => theme.text};

  & strong {
    color: ${({ theme }) => theme.text};
  }
`;

export const TechName = styled.span`
  color: ${({ theme }) => theme.text};
`;

export const RemoveAssigned = styled.button`
  background-color: ${({ theme }) => theme.bg2};
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
  border-radius: 8px;

  &:hover {
    border-color: #a0aec0;
  }

  &:focus {
    border-color: #c3aff0;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text};
  }
`;

export const StyledSelect = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  appearance: none;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: border-color 0.2s;
  border-radius: 8px;

  &:focus {
    border-color: #a0aec0;
    outline: none;
  }

  &:hover {
    border-color: #a0aec0;
  }

  &:disabled {
    cursor: not-allowed;
  }

  & option,
  optgroup {
    color: ${({ theme }) => theme.text};
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 10px;

  &:focus {
    border-color: #7f56d8;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text};
  }

  &:disabled {
    cursor: not-allowed;
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
  border-radius: 8px;

  &:hover {
    background-color: #c3aff0;
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
  border: none;
  border-radius: 4px;
  max-height: 340px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
`;

export const MessageWrapper = styled.div<{ isTech?: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isTech ? "flex-start" : "flex-end")};
  max-width: 80%;
  margin-bottom: 10px;
`;

export const Message = styled.div<{ isTech: boolean }>`
  padding: 5px 10px;
  border-radius: 15px;
  background-color: ${(props) => (props.isTech ? "#dcf6c7" : "#dfd8cf")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word;
`;

export const Timestamp = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.primary};
  margin-top: 4px;
`;

export const ReplyContainer = styled.div`
  position: relative;
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
    color: ${({ theme }) => theme.primary};
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

export const MessagesContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: auto;
  max-height: 100%;
  padding: 1rem 1rem 0 1rem;
  overflow-y: auto;
  flex-wrap: wrap;
`;

export const SubmitContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 97%;
  left: 1.5%;
  height: 120px;
  background: #fff;
  border: 1px solid #a7a7a7;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & textarea {
    outline: none;
    resize: none;
    height: 100%;
    width: 80%;
    border: 0px;
    border-bottom: 1px dashed #a7a7a7;
    padding: 0.2rem;
    overflow-y: auto;
    font-family: Poppins;
    color: var(--secondary-color);
    font-weight: 500;
  }
`;

export const SubmitButtonsContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: flex-end;
`;

export const ImagesPreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const ImagePreview = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
`;
