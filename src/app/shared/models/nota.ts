import {Fornecedor} from "./fornecedor";

export class Nota {
  id!: number;
  numero!: number;
  data!: Date;
  fornecedor!: Fornecedor;
  nomeFornecedor!: string;
}
