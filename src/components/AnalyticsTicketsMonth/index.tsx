import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as S from "./styles";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p className="label">{`Dia ${payload[0].payload.day} : ${payload[0].value} chamados`}</p>
      </div>
    );
  }

  return null;
};

export function AnalyticsTicketsMonth({ data }: any) {
  let ticketsData = {} as any;

  if (data) {
    ticketsData = Object.entries(data?.ticketsPerDay).map(([day, tickets]) => ({
      day,
      tickets,
    }));
  }

  return (
    <S.EarningsContainer>
      <S.InfoWrapper>
        <h4>Número de chamados no mês</h4>
        <h1>{data?.totalTickets}</h1>
      </S.InfoWrapper>

      <S.Chart>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={ticketsData}
            margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip data={ticketsData} />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#7F56D8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </S.Chart>
    </S.EarningsContainer>
  );
}
