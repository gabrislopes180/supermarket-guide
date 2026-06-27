export interface Route {
  item: string | null;
  corredor_destino: string | null;
  instrucao: string | null;
  status: string;
}

export interface PromptResponse {
  explicacao: string;
  message: string;
  mercado: string;
  rota: {
    explicacao: string;
    message: string;
    mercado: string;
    rota: Route[];
  };
}

export interface Chat {
  id: string;
  message: string;
  isMe: boolean;
}
