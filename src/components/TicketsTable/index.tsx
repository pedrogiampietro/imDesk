import * as S from "./styles";

export function Table({ data }: any) {
  const keys = [
    "Descrição",
    "Categoria",
    "Status",
    "Prioridade",
    "Progresso de SLA",
    "Localização",
    "Usuario",
  ];

  return (
    <>
      {data.length > 0 && (
        <S.Table>
          <S.THead>
            <S.THeadTR>
              {["#", ...keys].map((item, index) => (
                <S.TH key={index}>{item}</S.TH>
              ))}
            </S.THeadTR>
          </S.THead>
          <S.TBody>
            {data.map((ticket: any, index: number) => (
              <S.TBodyTR key={`ticket-${index}`}>
                <S.TD>{index + 1}</S.TD>
                <S.TD>{ticket.description?.substr(0, 30)}</S.TD>
                <S.TD>{ticket.ticketCategoryId.name}</S.TD>
                <S.TD>{ticket.status}</S.TD>
                <S.TD>{ticket.ticketPriorityId.name}</S.TD>
                <S.TD>{ticket.timeEstimate}</S.TD>
                <S.TD>{ticket.ticketLocationId.name}</S.TD>
                <S.TD>{ticket.User.name}</S.TD>
              </S.TBodyTR>
            ))}
          </S.TBody>
        </S.Table>
      )}
    </>
  );
}
