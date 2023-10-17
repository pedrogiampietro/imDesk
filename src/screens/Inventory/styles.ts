import styled from "styled-components";

export const Container = styled.div``;

export const Button = styled.button`
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 10px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
