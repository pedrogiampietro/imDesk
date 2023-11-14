import styled from "styled-components";

interface UrgencyProps {
  urgency: "Baixa" | "Média" | "Alta";
}

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  position: relative;
`;

export const CardContainer = styled.div<UrgencyProps>`
  margin-top: 1.5rem;
  background-color: ${({ theme }) => theme.bg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 1.25rem;

  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const InnerBackground = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 3px;
  padding: 1rem;
`;

export const StatusCircle = styled.span<UrgencyProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background-color: ${(props) =>
    props.urgency === "Alta"
      ? "#ff6a6a8c"
      : props.urgency === "Média"
      ? "#d7d70cb8"
      : "#8bd58b"};
`;

export const DefaultAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-right: 8px;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const OpenModalLink = styled.a`
  cursor: pointer;
  color: #7f56d8;
  text-decoration: underline;
`;

export const TicketId = styled.h4`
  color: ${({ theme }) => theme.text};
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
`;

export const TitleOpenedWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Title = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

export const OpenedAt = styled.span`
  color: #84818a;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
`;

export const Description = styled.p`
  margin: 8px 0 1rem 0;
  color: ${({ theme }) => theme.text};
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Urgency = styled.span<UrgencyProps>`
  background-color: ${(props) =>
    props.urgency === "Alta"
      ? "#ff6a6a8c"
      : props.urgency === "Média"
      ? "#d7d70cb8"
      : "#8bd58b"};
  color: ${(props) =>
    props.urgency === "Alta"
      ? "#ff6a6a8c"
      : props.urgency === "Média"
      ? "#d7d70cb8"
      : "#8bd58b"};
  padding: 0 2rem;
  border-color: ${(props) =>
    props.urgency === "Alta"
      ? "#ff6a6a8c"
      : props.urgency === "Média"
      ? "#d7d70cb8"
      : "#8bd58b"};
  border: 1px solid;
  border-radius: 50px;
  font-weight: bold;
`;

export const OpenedBy = styled.span`
  color: #84818a;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
`;

export const TopLine = styled.div`
  height: 1px;
  background-color: #e7e7e7;
  margin-bottom: 8px;
  width: 100%;
`;
