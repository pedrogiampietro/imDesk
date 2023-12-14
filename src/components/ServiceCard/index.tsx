import styled from "styled-components";
import { FaClock } from "react-icons/fa";
import { RiAlertFill } from "react-icons/ri";

const CardContainer = styled.div`
  width: 25%;
  height: fit-content;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 15px;
  padding: 20px;
  margin: 0 20px 0 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  text-align: center;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardHeader = styled.div`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const BorderBottom = styled.div`
  width: 100%;
  height: 2px;
  background: #aaa;
  margin: 10px 0;
`;

const CardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  & span {
    color: ${({ theme }) => theme.text};
    font-weight: bold;
  }

  svg {
    margin-right: 10px;
  }
`;

const CardValue = styled.h3<{ color: string }>`
  font-size: 18px;
  color: ${(props) => props.color};
  font-weight: bold;
  margin-left: 0.5rem;
`;

export function ServiceCard({ all, today, tomorrow, after }: any) {
  return (
    <CardContainer>
      <CardHeader>Vencimento Atendimento</CardHeader>
      <BorderBottom />
      <CardItem>
        <FaClock fill="#34A853" size={20} />
        <span>Todos:</span>
        <CardValue color="#34A853"> {all}</CardValue>
      </CardItem>
      <CardItem>
        <RiAlertFill fill="#FFC107" size={20} />
        <span>Hoje:</span>
        <CardValue color="#FFC107"> {today}</CardValue>
      </CardItem>
      <CardItem>
        <RiAlertFill fill="#9C27B0" size={20} />
        <span>Amanhã:</span>
        <CardValue color="#9C27B0"> {tomorrow}</CardValue>
      </CardItem>
      <CardItem>
        <RiAlertFill fill="#1e94d8" size={20} />
        <span>Depois:</span>
        <CardValue color="#1e94d8"> {after}</CardValue>
      </CardItem>
    </CardContainer>
  );
}
