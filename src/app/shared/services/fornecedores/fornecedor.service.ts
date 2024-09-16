import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Fornecedor} from "../../models/fornecedor";

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private readonly API = `/api/fornecedores`;

  constructor(
    private http: HttpClient
  ) { }

  getFornecedores() {
    return this.http.get<Fornecedor[]>(this.API);
  }

  postFornecedor(fornecedor: Fornecedor) {
    console.log(fornecedor)
    return this.http.post<Fornecedor>( this.API, fornecedor );
  }

  updateFornecedores(fornecedorId: number, fornecedor: Fornecedor) {
    return this.http.put<Fornecedor>(`${this.API}/${fornecedorId}`, fornecedor);
  }

  deleteFornecedores(fornecedorId: number) {
    return this.http.delete<Fornecedor>(`${this.API}/${fornecedorId}`);
  }
}
