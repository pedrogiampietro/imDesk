import React, { useEffect, useState, useRef } from "react";
import { Layout } from "../../components/Layout";
import { NutritionLabelLayout } from "../../components/NutritionLabelLayout";
import ReactToPrint from "react-to-print";
import * as S from "./styles";

export function Nutrition() {
  const [pacientes, setPacientes] = useState([]);
  const printRefs = useRef([]);

  useEffect(() => {
    // Dados mock para simular o que você receberia de sua API
    const mockData = [
      {
        id: 1,
        nome_completo: "João Silva",
        data_nascimento: "1990-01-01",
        dieta: {
          almoco: "Arroz, feijão, frango grelhado e salada",
          jantar: "Sopa de legumes",
          observacoes: "Sem lactose",
        },
      },
      {
        id: 2,
        nome_completo: "Maria Oliveira",
        data_nascimento: "1985-05-15",
        dieta: {
          almoco: "Peixe grelhado com legumes",
          jantar: "Salada de frutas",
          observacoes: "Sem açúcar",
        },
      },
    ];

    setPacientes(mockData);
  }, []);

  const handlePrintAll = () => {
    printButtonsRef.current.forEach((button) => button && button.click());
  };

  return (
    <Layout>
      <div>
        <button
          onClick={() => {
            printRefs.current.forEach((ref) => ref());
          }}
        >
          Imprimir Todos
        </button>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {pacientes.map((paciente, index) => {
            const componentRef = React.createRef();

            return (
              <div style={{ margin: "10px" }} key={paciente.id}>
                <ReactToPrint
                  content={() => componentRef.current}
                  trigger={() => <button>Imprimir</button>}
                  onBeforeGetContent={() => {
                    if (!printRefs.current.includes(componentRef)) {
                      printRefs.current.push(() =>
                        componentRef.current.handlePrint()
                      );
                    }
                  }}
                />
                <NutritionLabelLayout ref={componentRef} paciente={paciente} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
