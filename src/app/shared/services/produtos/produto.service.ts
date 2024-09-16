import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produto} from "../../models/produto";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = `/api/produtos`;

  constructor(
    private http: HttpClient
  ) { }

  getProdutos() {
    return this.http.get<Produto[]>(this.API);
  }

  postProduto(produto: Produto) {
    return this.http.post<Produto>(this.API, produto);
  }

  updateProduto(produtoId: number, produto: Produto) {
    return this.http.put<Produto>(`${this.API}/${produtoId}`, produto);
  }

  deleteProdutos(produtoId: number) {
    return this.http.delete<Produto>(`${this.API}/${produtoId}`);
  }
}
