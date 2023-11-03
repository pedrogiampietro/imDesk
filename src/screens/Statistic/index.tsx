import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";
import * as S from "./styles";

interface SLAViolationData {
  technicianId: string;
  slaViolationsCount: number;
}

interface OpenTicketsByLocationData {
  locationName: string;
  openTicketsCount: number;
}

export function Statistic() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [slaViolations, setSLAViolations] = useState<SLAViolationData[]>([]);
  const [openTicketsByLocation, setOpenTicketsByLocation] = useState<
    OpenTicketsByLocationData[]
  >([]);

  useEffect(() => {
    fetchSLAViolations();
  }, []);

  const fetchSLAViolations = async () => {
    try {
      setIsLoading(true);

      const response = await apiClient().get(
        "/report/sla-violations-by-technician"
      );

      setSLAViolations(
        Object.entries(response.data.body).map(([technicianId, data]: any) => ({
          technicianId,
          slaViolationsCount: data.slaViolationsCount,
        }))
      );
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Ocorreu um erro ao buscar os dados."
      );
      toast.error("Erro ao carregar violações de SLA.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenTicketsByLocation();
  }, []);

  const fetchOpenTicketsByLocation = async () => {
    try {
      const { data } = await apiClient().get(
        "/report/open-tickets-by-location"
      );

      setOpenTicketsByLocation(data.body);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Ocorreu um erro ao buscar os dados."
      );
      toast.error("Erro ao carregar tickets abertos por localização.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <S.Container>
        {isLoading && <S.Loading>Carregando...</S.Loading>}
        {error && <S.Error>{error}</S.Error>}

        <>
          <S.ReportTitle>Tickets Violados por Tecnico</S.ReportTitle>
          <S.Table>
            <thead>
              <S.TableRow>
                <S.TableHeader>Tecnico</S.TableHeader>
                <S.TableHeader>N de Chamados Violados</S.TableHeader>
              </S.TableRow>
            </thead>
            <tbody>
              {slaViolations.map((violation) => (
                <S.TableRow key={violation.technicianId}>
                  <S.TableCell>{violation.technicianId}</S.TableCell>
                  <S.TableCell>{violation.slaViolationsCount}</S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </>

        <>
          <S.ReportTitle>Tickets Abertos por Localização</S.ReportTitle>
          <S.Table>
            <thead>
              <S.TableRow>
                <S.TableHeader>Localização</S.TableHeader>
                <S.TableHeader>Tickets Abertos</S.TableHeader>
              </S.TableRow>
            </thead>
            <tbody>
              {openTicketsByLocation.map((item) => (
                <S.TableRow key={item.locationName}>
                  <S.TableCell>{item.locationName}</S.TableCell>
                  <S.TableCell>{item.openTicketsCount}</S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        </>
      </S.Container>
    </Layout>
  );
}
