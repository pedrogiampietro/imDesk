import React from "react";
import styled from "styled-components";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

const PaginationButton = styled.button<Pick<PaginationItemProps, "isCurrent">>`
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.isCurrent ? "purple" : "gray")};
  color: ${(props) => (props.isCurrent ? "white" : "black")};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.isCurrent ? "darkviolet" : "lightgray"};
  }
`;

export function PaginationItem({
  number,
  isCurrent = false,
  onPageChange,
}: PaginationItemProps) {
  return (
    <PaginationButton
      role="listitem"
      onClick={() => onPageChange(number)}
      isCurrent={isCurrent}
    >
      {number}
    </PaginationButton>
  );
}
