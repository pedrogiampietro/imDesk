import styled from "styled-components";

export const Container = styled.div`
  width: 98%;
  min-height: 100vh;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;

  background: ${({ theme }) => theme.bgLinear};
  padding: 2rem;
  border-radius: 10px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  background-color: #7f56d8;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background-color: #c3aff0;
  }
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
    background-color: ${(props) => props.theme.bg2};
  }
`;

export const TableCell = styled.td`
  padding: 0 15px;
  border: 1px solid #ddd;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
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

export const Header = styled.div`
  width: 100%;

  & div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;

    & select {
      width: auto;
      margin-bottom: 1rem;
    }
  }
`;

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
  z-index: 100;

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

export const NoItemsMessage = styled.span`
  margin-top: 1.25rem;
  text-align: center;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text};
`;
