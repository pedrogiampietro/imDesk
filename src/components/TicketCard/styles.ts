import styled from "styled-components";

export const CardContainer = styled.div`
  max-width: 90vw;

  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin: 2rem 0 16px 0;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: #fff;
  cursor: pointer;
`;

export const TitleOpenedWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Title = styled.h3`
  margin-top: 0;
`;

export const OpenedAt = styled.span`
  margin-left: auto;
`;

export const Description = styled.p`
  margin: 8px 0 2rem 0;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

interface UrgencyProps {
  urgency: "Baixa" | "Média" | "Alta" | "Urgente";
}

export const Urgency = styled.span<UrgencyProps>`
  background-color: ${(props) =>
    props.urgency === "Urgente"
      ? "#ff818e"
      : props.urgency === "Alta"
      ? "orange"
      : props.urgency === "Média"
      ? "#f7efa2"
      : "#eefdec"};
  color: ${(props) =>
    props.urgency === "Urgente"
      ? "#ff6347"
      : props.urgency === "Alta"
      ? "orange"
      : props.urgency === "Média"
      ? "#d6cf8f"
      : "#74c86b"};
  padding: 0 2rem;
  border-color: ${(props) =>
    props.urgency === "Urgente"
      ? "red"
      : props.urgency === "Alta"
      ? "orange"
      : props.urgency === "Média"
      ? "yellow"
      : "#74c86b"};
  border: 1px solid;
  border-radius: 50px;
  font-weight: bold;
`;

export const OpenedBy = styled.span``;
