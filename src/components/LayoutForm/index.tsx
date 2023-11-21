import { useEffect } from "react";
import { formatarData } from "../../utils/dateTime";
import { CreateCard } from "../CreateCard";
import { DropdownMenuComponent } from "../DropdownMenu";
import { Pagination } from "../Pagination";
import Select from "react-select";
import * as S from "./styles";
import { truncateText } from "../../utils";

export function LayoutForm({
  data = [],
  handleView,
  handleEdit,
  handleDelete,
  tableHeader,
  pageTitle,
  handleShowCreateModal,
  showCreateCard,
  formFields,
  formSelectOptions,
  handleCreate,
  headerToDataKeyMap,
  isEditMode,
  page,
  setPage,
  perPage,
  setPerPage,
  totalCount,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isMultiCompany,
  searchTerm,
  setSearchTerm,
}: any) {
  const perPageOptions = [
    { value: 15, label: "15 itens por página" },
    { value: 25, label: "25 itens por página" },
    { value: 50, label: "50 itens por página" },
  ];

  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(startItem + perPage - 1, totalCount);

  const isCategoryResponse = (data: any) => {
    return data.some((item: any) => item.hasOwnProperty("options"));
  };

  const handlePerPageChange = (selectedOption: any) => {
    setPerPage(selectedOption.value);
    setPage(1);
  };

  const handleDateFilterChange = () => {
    // Aqui você pode chamar a API para atualizar a lista baseada nas datas
    // Exemplo: fetchData(startDate, endDate);
  };

  useEffect(() => {
    if (showCreateCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCreateCard]);

  return (
    <S.Container>
      <S.HeaderActions>
        <S.PageHeader>{pageTitle}</S.PageHeader>

        <S.ActionGroup>
          {formFields.button && (
            <S.CreateButton
              onClick={handleShowCreateModal}
              aria-label={`Criar ${pageTitle}`}
            >
              {showCreateCard ? "Fechar" : `Criar ${pageTitle}`}
            </S.CreateButton>
          )}

          <S.SelectLabel>
            <Select
              options={perPageOptions}
              onChange={handlePerPageChange}
              defaultValue={perPageOptions[0]}
              aria-label="Selecionar quantidade de itens por página"
            />
          </S.SelectLabel>
        </S.ActionGroup>

        <S.DateFilterGroup>
          <S.DateInputLabel htmlFor="start-date">
            Data Inicial:
          </S.DateInputLabel>
          <S.DateInput
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            aria-label="Selecionar data inicial"
          />

          <S.DateInputLabel htmlFor="end-date">Data Final:</S.DateInputLabel>
          <S.DateInput
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            aria-label="Selecionar data final"
          />

          <S.FilterButton onClick={handleDateFilterChange}>
            Filtrar
          </S.FilterButton>
        </S.DateFilterGroup>

        <S.Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome"
        />
      </S.HeaderActions>

      <S.TableContainer>
        <S.Table>
          <S.TableHead>
            <S.TableRow>
              {tableHeader.map((header: any) => (
                <S.TableHeader key={header.id}>{header.name}</S.TableHeader>
              ))}
            </S.TableRow>
          </S.TableHead>

          <S.TableBody>
            {data.map((item: any) => (
              <S.TableRow key={item.id}>
                {tableHeader.map((header: any) => {
                  const dataKey = headerToDataKeyMap[header.name];
                  if (header.name === "Ações") {
                    return (
                      <S.TableCell key={header.id}>
                        <DropdownMenuComponent
                          onEdit={() => handleEdit(item.id)}
                          onDelete={() => handleDelete(item.id)}
                          onView={() => handleView(item.id)}
                        />
                      </S.TableCell>
                    );
                  } else if (
                    header.name === "Criado em" ||
                    header.name === "Atualizado em" ||
                    header.name === "Resolvido em"
                  ) {
                    return (
                      <S.TableCell key={header.id}>
                        {item[dataKey] ? formatarData(item[dataKey]) : "—"}
                      </S.TableCell>
                    );
                  } else {
                    return (
                      <S.TableCell key={header.id}>
                        {truncateText(item[dataKey], 240)}
                      </S.TableCell>
                    );
                  }
                })}
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableContainer>
      {showCreateCard && (
        <S.CreateCardContainer className={showCreateCard ? "active" : ""}>
          <S.CloseButton onClick={handleShowCreateModal}>&times;</S.CloseButton>

          <CreateCard
            formFields={formFields}
            formSelectOptions={formSelectOptions}
            handleCreate={handleCreate}
            isEditMode={isEditMode}
            isMultiCompany={isMultiCompany}
          />
        </S.CreateCardContainer>
      )}

      {totalCount > 0 && (
        <>
          <S.PaginationWrapper>
            <span>
              Mostrando {startItem} a {endItem} de {totalCount} registros
            </span>
          </S.PaginationWrapper>
          {perPage < totalCount && (
            <S.PaginationWrapper>
              <Pagination
                totalCountOfRegisters={totalCount}
                currentPage={page}
                onPageChange={setPage}
                registersPerPage={perPage}
              />
            </S.PaginationWrapper>
          )}
        </>
      )}
    </S.Container>
  );
}
