import { ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
  text: string;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  top: 50%;
  left: 100%;
  margin-left: 5px;
  transform: translateY(-50%);

  opacity: 0;
  transition: opacity 0.3s;
`;

export const Tooltip = ({ text, children }: LayoutProps) => (
  <TooltipContainer>
    {children}
    <TooltipText className="tooltiptext">{text}</TooltipText>
  </TooltipContainer>
);
