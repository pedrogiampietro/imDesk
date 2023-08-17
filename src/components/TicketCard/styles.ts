import styled from "styled-components";

interface UrgencyProps {
  urgency: "Baixa" | "Média" | "Alta";
}

export const CardContainer = styled.div<UrgencyProps>`
  margin-top: 3.5rem;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s;
  border-top: 4px solid
    ${(props) =>
      props.urgency === "Alta"
        ? "#df663d"
        : props.urgency === "Média"
        ? "#f7efa2"
        : "#eefdec"};
  color: ${(props) =>
    props.urgency === "Alta"
      ? "#ffa07a"
      : props.urgency === "Média"
      ? "#d6cf8f"
      : "#74c86b"};
  padding: 1rem 2rem;
  border-color: ${(props) =>
    props.urgency === "Alta"
      ? "#ffa07a"
      : props.urgency === "Média"
      ? "yellow"
      : "#74c86b"};
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const TitleOpenedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Title = styled.h4`
  margin: 0;
  color: #333;
  font-weight: bold;
`;

export const OpenedAt = styled.span`
  color: #999;
  font-size: 13px;
`;

export const Description = styled.p`
  margin-bottom: 16px;
  color: #666;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Urgency = styled.span<UrgencyProps>`
  background-color: ${(props) =>
    props.urgency === "Alta"
      ? "#df663d"
      : props.urgency === "Média"
      ? "#f7efa2"
      : "#eefdec"};
  color: ${(props) =>
    props.urgency === "Alta"
      ? "#ffa07a"
      : props.urgency === "Média"
      ? "#d6cf8f"
      : "#74c86b"};
  padding: 0 2rem;
  border-color: ${(props) =>
    props.urgency === "Alta"
      ? "#ffa07a"
      : props.urgency === "Média"
      ? "yellow"
      : "#74c86b"};
  border: 1px solid;
  border-radius: 50px;
  font-weight: bold;
`;

export const OpenedBy = styled.span`
  color: #999;
  font-size: 13px;
`;
