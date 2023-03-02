import { ReactNode } from "react";
import { Sidebar } from "../Sidebar/";

import * as S from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <S.Layout>
      <Sidebar />
      <S.Main>{children}</S.Main>
    </S.Layout>
  );
}
