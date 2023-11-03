import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 0.5rem;
  margin-top: 0.25rem;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    border-color: #017cff;
    box-shadow: 0 0 0 1px #017cff;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

export const Button = styled.button<{ isActive?: boolean }>`
  background-color: ${({ theme, isActive }) =>
    !isActive ? theme.bg3 : theme.primary};
  color: ${({ isActive }) => (isActive ? "#000" : "#FFF")};
  font-size: 16px;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    opacity: 0.8;
    transition: 0.4s ease;
  }

  &:disabled {
    background-color: #aaa;
    cursor: default;
  }
`;

export const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`;

export const ReportTitle = styled.h2`
  text-align: center;
  margin-top: 2rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: 1px solid ${(props) => props.theme.border};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.bg2};
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #c3aff0;
  text-align: center;
  vertical-align: middle;
`;

export const Loading = styled.div`
  color: #017cff;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;

export const Error = styled.div`
  color: #ff1744;
  font-weight: 500;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
