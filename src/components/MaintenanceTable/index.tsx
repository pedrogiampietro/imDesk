import { AiOutlineEye, AiFillDelete, AiOutlineEdit } from "react-icons/ai";

import * as S from "./styles";

export function MaintenanceTable({
  data,
  setShowMaintenanceModal,
  setMaintenance,
}: any) {
  const keys = [
    "Nome",
    "Localização",
    "Número de série",
    "Patrimônio",
    "Modelo",
    "Ações",
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
            {data.map((ticket: any, index: any) => (
              <S.TBodyTR key={ticket.id}>
                <S.TD>{index + 1}</S.TD>
                <S.TD>{ticket.name}</S.TD>
                <S.TD>{ticket.location}</S.TD>
                <S.TD>{ticket.serialNumber}</S.TD>
                <S.TD>{ticket.patrimony}</S.TD>
                <S.TD>{ticket.model}</S.TD>
                <S.TD>
                  <div>
                    <AiOutlineEye
                      onClick={() => {
                        setShowMaintenanceModal(true);
                        setMaintenance(ticket);
                      }}
                    />
                    <AiFillDelete />
                    <AiOutlineEdit />
                  </div>
                </S.TD>
              </S.TBodyTR>
            ))}
          </S.TBody>
        </S.Table>
      )}
    </>
  );
}
