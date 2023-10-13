import styled from "styled-components";
import { PaginationItem } from "./PaginationItem";

const siblingsCount = 1;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

const PaginationContainer = styled.nav``;

const PaginationList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`;

const PaginationButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #ccc;
`;

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];

  return (
    <PaginationContainer aria-label="pagination-nav">
      <PaginationList className="pagination">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationButton onClick={() => onPageChange(1)}>
              1
            </PaginationButton>
            {currentPage > 2 + siblingsCount && (
              <li>
                <PaginationItem
                  number={currentPage - 1}
                  onPageChange={onPageChange}
                />
              </li>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationButton key={page} onClick={() => onPageChange(page)}>
              {page}
            </PaginationButton>
          ))}

        <li>
          <PaginationItem
            number={currentPage}
            isCurrent
            onPageChange={onPageChange}
          />
        </li>

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationButton key={page} onClick={() => onPageChange(page)}>
              {page}
            </PaginationButton>
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <li>
                <PaginationItem
                  number={currentPage + 1}
                  onPageChange={onPageChange}
                />
              </li>
            )}
            <PaginationButton onClick={() => onPageChange(lastPage)}>
              {lastPage}
            </PaginationButton>
          </>
        )}
      </PaginationList>
    </PaginationContainer>
  );
}
