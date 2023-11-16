import styled from "styled-components";

export const Container = styled.div`
  width: 98%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;

  background: ${({ theme }) => theme.bgLinear};
  padding: 2rem;
  border-radius: 10px;
`;

export const Table = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  thead {
    background-color: #007bff;
    color: white;
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

export const ShiftChangeListContainer = styled.div`
  background: #fff;
  width: 100%;
  margin: 2rem 0;
  border-radius: 10px;
  font-size: 0.9em;
  padding: 10px;
  color: #856404;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  & h1 {
    font-size: 2rem;
    display: flex;
    margin: 0 auto;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Checkbox = styled.input`
  margin-right: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 15rem;
  margin: 0 auto;
  background-color: ${(props) => props.theme.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`;

export const Section = styled.section`
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SectionTitle = styled.h2`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
`;

export const ChamadoItem = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border-left: ${(props) => `4px solid ${props.theme.primary}`};
  font-size: 0.9em;
  color: #555;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Notas = styled.div`
  background-color: #fff3cd;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.9em;
  color: #856404;
  border-left: 4px solid #ffeeba;
`;

export const CollapseHeader = styled.div`
  background-color: ${(props) => props.theme.primary};
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #28a745;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #218838;
  }
`;
