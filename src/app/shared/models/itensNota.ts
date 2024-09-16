import {Produto} from "./produto";

export class ItensNota {
  id!: number;
  quantidade!: number;
  valor_total!: number;
  numeroNota!: number;
  produtos!: Produto;
  nomeProduto!: string;
}
