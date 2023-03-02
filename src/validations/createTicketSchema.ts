import * as yup from "yup";

export const createNewTicketSchema = yup.object().shape({
  ticket_type: yup.string().required("Um tipo de chamado é obrigatório"),
  ticket_category: yup
    .string()
    .required("Uma categoria de chamado é obrigatória"),
  ticket_priority: yup
    .string()
    .required("Uma prioridade de chamado é obrigatória"),
  ticket_location: yup.string().required("Uma localização é obrigatória"),
});
