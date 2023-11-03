import React, { useState, useEffect } from "react";
import Select from "react-select";
import * as S from "./styles";
import { apiClient } from "../../services/api";

interface Company {
  id: string;
  name: string;
}

interface ChangeCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanyChange: (companyId: string) => void;
}

export const ChangeCompanyModal: React.FC<ChangeCompanyModalProps> = ({
  isOpen,
  onClose,
  onCompanyChange,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiClient().get("/companies");

        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = () => {
    onCompanyChange(selectedCompany);
    onClose();
  };

  const handleCompanySelectChange = (selectedOption: any) => {
    setSelectedCompany(selectedOption.value);
  };

  const companiesOptions = companies
    ? companies.map((companie: any) => ({
        value: companie.id,
        label: companie.name,
      }))
    : [];

  if (!isOpen) return null;

  return (
    <S.ModalBackground>
      <S.ModalContainer>
        <S.ModalHeader>
          <h2>Escolha uma Empresa</h2>
          <button onClick={onClose}>X</button>
        </S.ModalHeader>
        <S.ModalContent>
          <S.InputGroup>
            <S.InputLabel>Empresas</S.InputLabel>
            <Select
              options={companiesOptions}
              onChange={handleCompanySelectChange}
            />
          </S.InputGroup>
        </S.ModalContent>
        <S.ModalFooter>
          <button onClick={handleCompanyChange}>Confirmar</button>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};
