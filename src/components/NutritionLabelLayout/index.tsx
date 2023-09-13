import React, { useRef } from "react";
import "./styles.css";

export const NutritionLabelLayout = React.forwardRef(({ paciente }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        width: "377px",
        height: "170px",
      }}
    >
      <p>
        <strong>Nome Completo:</strong> {paciente.nome_completo}
      </p>
      <p>
        <strong>Data de Nascimento:</strong>{" "}
        {new Date(paciente.data_nascimento).toLocaleDateString()}
      </p>
      <p>
        <strong>Dieta:</strong>
      </p>
      <p>
        <strong>Almoço:</strong> {paciente.dieta.almoco}
      </p>
      <p>
        <strong>Jantar:</strong> {paciente.dieta.jantar}
      </p>
      <p>
        <strong>Observações:</strong> {paciente.dieta.observacoes}
      </p>
    </div>
  );
});
