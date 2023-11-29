import styled from "styled-components";

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

export const ReportTitle = styled.h2`
  text-align: center;
  margin-top: 2rem;
  color: ${({ theme }) => theme.text};
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
