import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";

export function AuthRoutes() {
  return (
    <Routes>
      {/* Componente da tela inicial */}
      <Route index element={<Login />} />
      {/* Componente de uma rota específica */}
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      {/* Componente para quando não encontrar uma rota */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
