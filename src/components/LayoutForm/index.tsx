import { CreateCard } from "../CreateCard";
import * as S from "./styles";

export function LayoutForm({
  data = [],
  handleView,
  handleEdit,
  handleDelete,
  tableHeader,
  pageTitle,
  handleCreateNewUser,
  showCreateCard,
  formFields,
  formSelectOptions,
}: any) {
  return (
    <S.Container>
      <S.HeaderActions>
        <S.PageHeader>{pageTitle}</S.PageHeader>
        <S.CreateButton onClick={handleCreateNewUser}>
          {showCreateCard ? "Fechar" : pageTitle}
        </S.CreateButton>
      </S.HeaderActions>
      <S.Wrapper>
        <S.Table>
          <S.TableHead>
            <S.TableRow>
              {tableHeader.map((header: any) => {
                return (
                  <S.TableHeader key={header.id}>{header.name}</S.TableHeader>
                );
              })}
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {data.map((item: any) => (
              <S.TableRow key={item.id}>
                <S.TableCell>{item.name}</S.TableCell>
                <S.TableCell>{item.address}</S.TableCell>
                <S.TableCell>{item.email}</S.TableCell>
                <S.TableCell>
                  <S.ActionButton onClick={() => handleView(item)}>
                    Visualizar
                  </S.ActionButton>
                  <S.ActionButton onClick={() => handleEdit(item)}>
                    Editar
                  </S.ActionButton>
                  <S.ActionButton danger onClick={() => handleDelete(item)}>
                    Excluir
                  </S.ActionButton>
                </S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>

        {showCreateCard && (
          <CreateCard
            formFields={formFields}
            formSelectOptions={formSelectOptions}
          />
        )}
      </S.Wrapper>
    </S.Container>
  );
}
