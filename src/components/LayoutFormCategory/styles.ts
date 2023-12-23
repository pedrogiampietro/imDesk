import styled from "styled-components";

interface ActionButtonProps {
  danger?: boolean;
}

export const Container = styled.div`
  width: 98%;
  height: 100vh;

  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;

  background: ${({ theme }) => theme.bgLinear};
  padding: 2rem;
  border-radius: 10px;
`;

export const TableContainer = styled.div`
  flex: 1;
  height: 100vh;
  max-height: 800px;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => props.theme.primary};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.border};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.bgAlpha};
  }
  height: 50px;
`;

export const TableCell = styled.td`
  padding: 1rem 15px;
  border: 1px solid #ddd;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

export const CreateCardContainer = styled.div`
  position: fixed;
  right: -100%;
  top: 0;
  width: 35vw;
  height: 100vh;
  background: ${({ theme }) => theme.bg2};
  box-shadow: -5px 0px 15px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  padding: 2rem;

  &.active {
    right: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PageHeader = styled.header`
  padding: 20px;
  background: transparent;
  text-align: center;
  border-radius: 10px 10px 0 0;
  font-size: 24px;
  color: ${(props) => props.theme.primary};
`;

export const ActionButton = styled.button<ActionButtonProps>`
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#7F56D8")};
  color: #fff;
  z-index: 100;
  top: 100%;
  right: 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#0056b3")};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export const CreateButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7f56d8;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6654a3;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;

  & span {
    color: ${({ theme }) => theme.text};
    font-size: 14px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ActionGroup = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateFilterGroup = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SelectLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const DateInputLabel = styled.label`
  color: ${({ theme }) => theme.text};
`;

export const Input = styled.input`
  width: 20%;
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  margin-bottom: 10px;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline: none;
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

export const DateInput = styled.input`
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;

export const FilterButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #7f56d8;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #6654a3;
  }
`;
