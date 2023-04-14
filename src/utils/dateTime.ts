export const formatDate = (date: any) => {
  const newDate = new Date(date);

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const year = newDate.getFullYear();
  const month = months[newDate.getMonth()];
  const getDate = newDate.getDate();
  let hour = newDate.getHours();
  hour = hour <= 9 ? `0${hour}` : (hour as any);
  let min = newDate.getMinutes();
  min = min <= 9 ? `0${min}` : (min as any);
  let sec = newDate.getSeconds();
  sec = sec <= 9 ? `0${sec}` : (sec as any);

  const time =
    getDate + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

  return time;
};

/**
 * Formata uma data em formato ISO 8601 para o formato "dia/mês/ano hora:minuto"
 * @param {string} dateString - A data em formato ISO 8601
 * @returns {string} - A data formatada
 */
export function formatarData(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}
