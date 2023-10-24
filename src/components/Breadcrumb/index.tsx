import React from "react";
import { Link } from "react-router-dom";
import * as S from "./styles";

export function Breadcrumb({ paths }: any) {
  return (
    <S.BreadcrumbContainer>
      {paths.map((path: any, index: number) => (
        <React.Fragment key={index}>
          <S.BreadcrumbItem>
            <Link to={path.url}>{path.name}</Link>
          </S.BreadcrumbItem>
          {index < paths.length - 1 && <S.Divider>/</S.Divider>}
        </React.Fragment>
      ))}
    </S.BreadcrumbContainer>
  );
}
