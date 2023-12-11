import styled from "styled-components";
export const Container = styled.div`
  display: flex;
`;

export const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 5px;
  padding: 9px 9px;
  margin-right: 45px;
`;

export const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;

  & h3 {
    color: ${({ theme }) => theme.text};
  }
`;

/* task board card */

export const TaskInformation = styled.div<{ priority: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background-color: ${({ theme }) => theme.bg2};
  font-size: 14px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  position: relative;
  margin-bottom: 0.95rem;

  &:before {
    content: "";
    position: absolute;
    top: 6%;
    left: 5px;
    bottom: 0;
    width: 3px;
    height: 85%;

    background-color: ${(props) => {
      switch (props.priority) {
        case "Baixa":
          return "#8bd58b";
        case "Média":
          return "#d7d70cb8";
        case "Alta":
          return "#ff6a6a8c";
        default:
          return "transparent";
      }
    }};
  }

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & span {
    font-size: 12px;
    color: ${({ theme }) => theme.text};
  }
`;

export const CategoryRow = styled.div`
  color: ${({ theme }) => theme.text};
  margin-top: 10px;
`;

export const DescriptionRow = styled.div`
  margin-top: 10px;
  color: #666;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  & span {
    color: ${({ theme }) => theme.text};
    font-size: 14px;
  }
`;

export const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const Initials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7f56d8;
  font-weight: bold;
  margin-right: 0.65rem;
  background-color: ${({ theme }) => theme.bg};
`;

export const Status = styled.span<{ level: string }>`
  width: 15px;
  height: 15px;
  color: ${({ theme }) => theme.text};
  background-color: ${(props) => {
    switch (props.level) {
      case "Baixa":
        return "#8bd58b";
      case "Média":
        return "#d7d70cb8";
      case "Alta":
        return "#ff6a6a8c";
      default:
        return "transparent";
    }
  }};
  display: inline-block;
  margin-left: 8px;
  border-radius: 3px;
`;
