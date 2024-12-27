
export type Ticket = {
  idticket: number;
  namepark: string;
  ticket_code: string;
  type_pay: string;
  type_money: string;
  name: string;
  lastname: string;
  email_person: string;
  phone_number: string;
  identity_type: string;
  identity_number: string;
  date_ticket: string;
  status: string;
  type_ticket_adults: string;
  count_adult: number;
  type_ticket_kids: string;
  count_kid: number;
  invoice_electronic: number;
  created_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  rol: string; 
  created_at?: string;
  updated_at?: string;
};

export type ApiResponse = {
  message: string;
  user: {
      id_user: number;
      name: string;
      email: string;
      password: string;
      rol: string;
      created_at: string;
      updated_at: string;
  }[];
};


export type CandidatosTable = {
  id: string;
  tipoid: string;
  nombre: string;
  celular: string;
  cargo: string;
  correo: string;
  motivo: string;
  estado_proceso: string;
  fecha_envio: string;
  fecha_ingreso: string | null;
  grupo: string;
  usuario_activo: string;
  estadoCandidato: number;
  user_creo: number;
};
