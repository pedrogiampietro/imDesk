import React, { useState } from "react";
import * as S from "./styles";

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

  const handleCompanyChange = () => {
    onCompanyChange(selectedCompany);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalBackground>
      <S.ModalContainer>
        <S.ModalHeader>
          <h2>Escolha uma Empresa</h2>
          <button onClick={onClose}>X</button>
        </S.ModalHeader>
        <S.ModalContent>
          {companies.map((company) => (
            <div key={company.id}>
              <input
                type="radio"
                id={company.id}
                name="company"
                value={company.id}
                checked={selectedCompany === company.id}
                onChange={() => setSelectedCompany(company.id)}
              />
              <label htmlFor={company.id}>{company.name}</label>
            </div>
          ))}
        </S.ModalContent>
        <S.ModalFooter>
          <button onClick={handleCompanyChange}>Confirmar</button>
        </S.ModalFooter>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};
