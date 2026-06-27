interface Route {
  item: string | null;
  corredor_destino: string | null;
  instrucao: string | null;
  status: string;
}

export function countItens(array: Route[]) {
  return array.length;
}
