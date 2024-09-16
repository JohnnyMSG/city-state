import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nota} from "../../models/nota";
import {Fornecedor} from "../../models/fornecedor";

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private readonly API = `/api/notas`;

  constructor(
    private http: HttpClient
  ) {
  }

  getNotas() {
    return this.http.get<Nota[]>(this.API);
  }

  postNota(nota: Nota) {
    return this.http.post<Nota>(this.API, nota);
  }

  updateNota(notaId: number, nota: Nota) {
    return this.http.put<Fornecedor>(`${this.API}/${notaId}`, nota);
  }

  deleteNota(notaId: number) {
    return this.http.delete<Fornecedor>(`${this.API}/${notaId}`);
  }
}
