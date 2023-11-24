import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled.div`
  .export-select {
    font-size: 16px;
    width: auto;

    .select__control {
      min-height: auto;
      height: 38px;
    }

    .select__value-container {
      padding: 2px 8px;
    }
  }
`;

export const ExportDropdown = ({ onExport }: any) => {
  const options = [
    { value: "csv", label: "Exportar como CSV" },
    { value: "pdf", label: "Exportar como PDF" },
  ];

  const handleChange = (selectedOption: any) => {
    onExport(selectedOption.value);
  };

  return (
    <StyledSelect>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Exportar..."
        isSearchable={false}
        className="export-select"
      />
    </StyledSelect>
  );
};
