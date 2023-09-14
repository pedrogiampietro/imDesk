import React from "react";
import "./styles.css";

export const NutritionLabelLayout = React.forwardRef(({ paciente }, ref) => {
  // Extração das informações do campo 'nome' para obter o nome completo e a data de nascimento
  const nomeData = paciente.nome ? paciente.nome.split("INT:") : ["", ""];
  const [nomeCompleto, dadosAdicionais] = nomeData;
  const dataDetalhes = dadosAdicionais
    ? dadosAdicionais.split("DN:")
    : ["", ""];
  const [intData, dnData] = dataDetalhes;
  const dataNascimento = dnData ? new Date(dnData.split(" ")[0]) : null;

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid black",
        margin: "10px",
        padding: "10px",
        width: "377px",
        height: "220px",
      }}
    >
      <p>
        <strong>Nome Completo:</strong> {nomeCompleto}
      </p>
      <p>
        <strong>Data de Internação:</strong>{" "}
        {intData ? intData.split(" ")[0] : ""}
      </p>
      <p>
        <strong>Data de Nascimento:</strong>{" "}
        {dataNascimento ? dataNascimento.toLocaleDateString() : ""}
      </p>
      <p>
        <strong>Dieta:</strong> {paciente.dieta}
      </p>
      <p>
        <strong>Almoço e Jantar:</strong> {paciente.refeicoes?.almocoJantar}
      </p>
      <p>
        <strong>Outras refeições:</strong> {paciente.refeicoes?.outros}
      </p>
      <p>
        <strong>Observações:</strong> {paciente.observacoesNutricionista}
      </p>
    </div>
  );
});
