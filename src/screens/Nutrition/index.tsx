import React, { useEffect, useState, useRef, useCallback } from "react";
import { Layout } from "../../components/Layout";
import { NutritionLabelLayout } from "../../components/NutritionLabelLayout";
import ReactToPrint from "react-to-print";
import * as XLSX from "xlsx";
import * as S from "./styles";

function Paciente({ paciente, printRefs }) {
  const componentRef = React.useRef();
  const triggerRef = React.useRef();

  useEffect(() => {
    if (!printRefs.current.includes(() => triggerRef.current?.click())) {
      printRefs.current.push(() => triggerRef.current?.click());
    }
  }, [printRefs]);

  return (
    <div style={{ margin: "10px" }}>
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => <button ref={triggerRef}>Imprimir</button>}
      />
      <NutritionLabelLayout ref={componentRef} paciente={paciente} />
    </div>
  );
}

function TodosPacientes({ pacientes }) {
  return (
    <div>
      {pacientes.map((paciente) => (
        <NutritionLabelLayout key={paciente.id} paciente={paciente} />
      ))}
    </div>
  );
}

export function Nutrition() {
  const [pacientes, setPacientes] = useState([]);
  const printRefs = useRef([]);
  const [setor, setSetor] = useState(null);
  const allComponentRef = useRef();
  const allPrintRef = useRef();
  const [isPrinting, setIsPrinting] = useState(false);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const mappedData = json
          .filter(
            (item) =>
              item["__EMPTY"] &&
              item["__EMPTY"].trim() !== "" &&
              item["__EMPTY"] !== "."
          )
          .map((item, index) => {
            let setor;
            const leito = item["HOSPITAL MUNICIPAL EVANDRO FREIRE"];
            if (leito && typeof leito === "string") {
              const leitoNumber = parseInt(leito.split("/")[1]);
              if (leitoNumber >= 1 && leitoNumber <= 10) {
                setor = `CTI ${leito.split("/")[0].slice(-1)}`;
              } else {
                setor = "Outro setor";
              }
            }
            return {
              id: index + 1,
              hospital: item["HOSPITAL MUNICIPAL EVANDRO FREIRE"],
              leito,
              setor,
              nome: item["__EMPTY"],
              idadePaciente: item["__EMPTY_2"],
              avaliacaoNutricional: item["__EMPTY_3"],
              evolucao: item["__EMPTY_4"],
              diagnostico: item["__EMPTY_5"],
              observacoesNutricionista: item["MAPA NUTRICIONISTA"],
              dieta: item["__EMPTY_6"],
              refeicoes: {
                almocoJantar: item["DATA: 14/09/2023"],
                outros: item["__EMPTY_7"],
              },
            };
          });
        setPacientes(mappedData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const getSectorFromLeito = (leito) => {
    if (leito.startsWith("301")) return "CTI 1";
    if (leito.startsWith("302")) return "CTI 2";
    if (leito.startsWith("303")) return "CTI 3";
    return "Outro";
  };

  return (
    <Layout>
      <div>
        <div>
          <h2>teste upload de excel</h2>
          <input type="file" onChange={handleFileUpload} />
        </div>
        <button
          onClick={() => {
            setIsPrinting(true);
            setTimeout(() => {
              allPrintRef.current?.click();
            }, 0);
          }}
        >
          Imprimir Todos
        </button>

        <ReactToPrint
          content={() => allComponentRef.current}
          trigger={() => (
            <span ref={allPrintRef} style={{ display: "none" }}></span>
          )}
          onAfterPrint={() => setIsPrinting(false)}
        />

        <div
          ref={allComponentRef}
          style={
            isPrinting
              ? {}
              : { visibility: "hidden", height: 0, overflow: "hidden" }
          }
        >
          <TodosPacientes pacientes={pacientes} />
        </div>

        <div>
          <button onClick={() => setSetor("CTI 1")}>CTI 1</button>
          <button onClick={() => setSetor("CTI 2")}>CTI 2</button>
          <button onClick={() => setSetor("CTI 3")}>CTI 3</button>
        </div>

        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {pacientes
            .filter(
              (paciente) =>
                !setor || getSectorFromLeito(paciente.leito) === setor
            )
            .map((paciente) => (
              <Paciente
                key={paciente.id}
                paciente={paciente}
                printRefs={printRefs}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}
