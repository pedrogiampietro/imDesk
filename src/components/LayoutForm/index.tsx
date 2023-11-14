import { formatarData } from "../../utils/dateTime";
import { CreateCard } from "../CreateCard";
import { DropdownMenuComponent } from "../DropdownMenu";
import { Pagination } from "../Pagination";
import Select from "react-select";
import * as S from "./styles";

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
}: any) {
  const perPageOptions = [
    { value: 10, label: "15 itens por página" },
    { value: 25, label: "25 itens por página" },
    { value: 50, label: "50 itens por página" },
  ];

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

  return (
    <S.Container>
      <S.HeaderActions>
        <S.PageHeader>{pageTitle}</S.PageHeader>
        {formFields.button ? (
          <S.CreateButton onClick={handleShowCreateModal}>
            {showCreateCard ? "Fechar" : `Criar ${pageTitle}`}
          </S.CreateButton>
        ) : null}

        <Select
          options={perPageOptions}
          onChange={handlePerPageChange}
          defaultValue={perPageOptions[0]}
        />
        <div>
          <label htmlFor="start-date">Data Inicial:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label htmlFor="end-date">Data Final:</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button onClick={handleDateFilterChange}>Filtrar</button>
        </div>
      </S.HeaderActions>

      <S.Wrapper>
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
              {isCategoryResponse(data)
                ? data.map((category: any) =>
                    category.options.map((option: any) => (
                      <S.TableRow key={option.id}>
                        {tableHeader.map((header: any) => {
                          if (header.name === "Ações") {
                            return (
                              <S.TableCell key={header.id}>
                                <DropdownMenuComponent
                                  onEdit={() => handleEdit(option.id)}
                                  onDelete={() => handleDelete(option.id)}
                                  onView={() => handleView(option.id)}
                                />
                              </S.TableCell>
                            );
                          } else if (header.name === "Criado em") {
                            const dataKey = headerToDataKeyMap[header.name];
                            return (
                              <S.TableCell key={header.id}>
                                {formatarData(option[dataKey])}
                              </S.TableCell>
                            );
                          } else {
                            const dataKey = headerToDataKeyMap[header.name];
                            return (
                              <S.TableCell key={header.id}>
                                {option[dataKey]}
                              </S.TableCell>
                            );
                          }
                        })}
                      </S.TableRow>
                    ))
                  )
                : data.map((item: any) => (
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
                        } else if (header.name === "Criado em") {
                          return (
                            <S.TableCell key={header.id}>
                              {formatarData(item[dataKey])}
                            </S.TableCell>
                          );
                        } else {
                          return (
                            <S.TableCell key={header.id}>
                              {item[dataKey]}
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
          <S.CreateCardContainer>
            <CreateCard
              formFields={formFields}
              formSelectOptions={formSelectOptions}
              handleCreate={handleCreate}
              isEditMode={isEditMode}
            />
          </S.CreateCardContainer>
        )}
      </S.Wrapper>

      {totalCount > 0 ? (
        <>
          <S.PaginationWrapper>
            <span>
              {page * perPage - perPage + 1} de {totalCount} registros
            </span>
          </S.PaginationWrapper>
          {perPage >= totalCount ? null : (
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
      ) : null}
    </S.Container>
  );
}
