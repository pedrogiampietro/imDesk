import styled from "styled-components";
import { FaClock } from "react-icons/fa";
import { RiAlertFill } from "react-icons/ri";

const CardContainer = styled.div`
  width: 20%;
  height: fit-content;

  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin: 0 15px 0 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CardHeader = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
`;

export const BorderBottom = styled.div`
  width: 100%;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  svg {
    margin-right: 10px;
  }
`;

const CardValue = styled.h3<{ color: string }>`
  font-size: 20px;
  color: ${(props) => props.color};
  font-weight: bold;
  margin-left: 0.3rem;
`;

export function ServiceCard({ all, today, tomorrow, after }: any) {
  return (
    <CardContainer>
      <CardHeader>Vencimento Atendimento</CardHeader>
      <BorderBottom />
      <CardItem>
        <FaClock fill="#34A853" size={18} />
        <span>Todos:</span>
        <CardValue color="#34A853"> {all}</CardValue>
      </CardItem>
      <CardItem>
        <RiAlertFill fill="#FFC107" size={18} />
        <span>Hoje:</span>
        <CardValue color="#FFC107"> {today}</CardValue>
      </CardItem>
      <CardItem>
        <RiAlertFill fill="#9C27B0" size={18} />
        <span>Amanhã:</span>
        <CardValue color="#9C27B0"> {tomorrow}</CardValue>
      </CardItem>
      <CardItem>
        <RiAlertFill fill="#1e94d8" size={18} />
        <span>Depois:</span>
        <CardValue color="#1e94d8"> {after}</CardValue>
      </CardItem>
    </CardContainer>
  );
}
