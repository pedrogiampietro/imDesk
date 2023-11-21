import styled from "styled-components";

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
  color: ${({ theme }) => theme.text};
`;

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 15,
  currentPage = 1,
  onPageChange,
}: {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  return (
    <PaginationContainer aria-label="pagination-nav">
      <PaginationList className="pagination">
        {currentPage > 1 && (
          <PaginationButton onClick={() => onPageChange(currentPage - 1)}>
            Anterior
          </PaginationButton>
        )}

        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          1
        </PaginationButton>

        {currentPage > 1 && currentPage < lastPage && (
          <PaginationButton
            onClick={() => onPageChange(currentPage)}
            disabled={true}
          >
            {currentPage}
          </PaginationButton>
        )}

        {lastPage > 1 && (
          <PaginationButton
            onClick={() => onPageChange(lastPage)}
            disabled={currentPage === lastPage}
          >
            {lastPage}
          </PaginationButton>
        )}

        {currentPage < lastPage && (
          <PaginationButton onClick={() => onPageChange(currentPage + 1)}>
            Próxima
          </PaginationButton>
        )}
      </PaginationList>
    </PaginationContainer>
  );
}
