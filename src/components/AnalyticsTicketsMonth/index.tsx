import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import * as S from "./styles";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
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
        {/* <S.Growth>
          <span>+2.45%</span>
        </S.Growth> */}
      </S.InfoWrapper>

      <S.Chart>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={ticketsData}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            barSize={20}
            style={{
              cursor: { fill: "transparent" },
            }}
          >
            <Tooltip content={<CustomTooltip data={ticketsData} />} />
            <Bar dataKey="tickets" fill="#7F56D8" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </S.Chart>
    </S.EarningsContainer>
  );
}
