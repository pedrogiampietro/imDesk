import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineMenu,
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{ rotate: boolean }>`
  color: ${(props) => (props.rotate ? "#7F56D8;" : "white")};
  background-color: ${(props) => (props.rotate ? "white" : "#7F56D8;")};
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s, color 0.3s;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${(props) => (props.rotate ? "#ddd" : "#2b667d")};
  }

  transform: ${(props) => (props.rotate ? "rotate(90deg)" : "none")};
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);

  & div {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: #ddd;
    }
  }
`;

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const DropdownMenuComponent: React.FC<Props> = ({
  onView,
  onEdit,
  onDelete,
}) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  return (
    <DropdownMenu>
      <DropdownButton
        onClick={() => setOpenDropdown(!openDropdown)}
        rotate={openDropdown}
      >
        <AiOutlineMenu />
      </DropdownButton>
      {openDropdown && (
        <DropdownContent>
          {onView && (
            <div
              onClick={onView}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlineEye style={{ marginRight: "10px" }} />
              Visualizar
            </div>
          )}
          {onEdit && (
            <div
              onClick={onEdit}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlineEdit style={{ marginRight: "10px" }} />
              Editar
            </div>
          )}
          {onDelete && (
            <div
              onClick={onDelete}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlineDelete style={{ marginRight: "10px" }} />
              Excluir
            </div>
          )}
        </DropdownContent>
      )}
    </DropdownMenu>
  );
};
