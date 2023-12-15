import * as S from "./styles";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";

export function Analytics(props: any) {
  return (
    <S.Section>
      <S.Analytic>
        <S.Content>
          <h5>Chamados Novos</h5>
          <h2>{props.newTicketsCount}</h2>
        </S.Content>
        <S.Logo>
          <BsFillCalendar2WeekFill />
        </S.Logo>
      </S.Analytic>
      <S.Analytic>
        <S.Logo>
          <IoStatsChart />
        </S.Logo>
        <S.Content>
          <h5>Chamados Atrasados</h5>
          <h2>{props.lateTicketsCount}</h2>
        </S.Content>
      </S.Analytic>
      <S.Analytic>
        <S.Content>
          <h5>Chamados Atribuídos</h5>
          <h2>{props.assignedTicketsCount}</h2>
        </S.Content>
        <S.Logo>
          <BiGroup />
        </S.Logo>
      </S.Analytic>
      <S.Analytic>
        <S.Logo>
          <FiActivity />
        </S.Logo>
        <S.Content>
          <h5>Total de chamados fechados</h5>
          <h2>{props.closedTicketsCount}</h2>
        </S.Content>
      </S.Analytic>
    </S.Section>
  );
}
