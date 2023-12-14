import styled from "styled-components";

import { AiOutlineInfoCircle } from "react-icons/ai";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
  height: 100vh;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgLinear};
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
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

export const Button = styled.button<{ isActive?: boolean }>`
  background: ${({ theme }) => theme.primary};
  color: #fff;
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

export const ReportResult = styled.div`
  margin-top: 20px;
  background-color: #f1f3f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  p {
    font-size: 16px;
    margin: 10px 0;
  }
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

export const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const ReportSection = styled.section`
  margin-top: 20px;
`;

export const ReportTitle = styled.h3`
  font-size: 20px;
  color: #212529;
`;

export const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const ReportTableHeader = styled.th`
  padding: 10px;
  border: 1px solid #dee2e6;
  background-color: #e9ecef;
  color: #212529;
`;

export const ReportTableData = styled.td`
  padding: 10px;
  border: 1px solid #dee2e6;
  text-align: center;
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const Tooltip = styled.span`
  visibility: hidden;
  width: 60rem;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
  font-family: emoji;
`;

export const TooltipIcon = styled(AiOutlineInfoCircle)`
  &:hover + ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;
