import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItensNota} from "../../models/itensNota";

@Injectable({
  providedIn: 'root'
})
export class ItensNotaService {

  private readonly API = `/api/itensNota`;

  constructor(
    private http: HttpClient
  ) {}

  getItensNota() {
    return this.http.get<ItensNota[]>(this.API);
  }

  postItemNota(itemNota: ItensNota) {
    return this.http.post<ItensNota>(this.API, itemNota);
  }

  updateItemNota(itemNotaId: number, itemNota: ItensNota) {
    return this.http.put<ItensNota>(`${this.API}/${itemNotaId}`, itemNota);
  }

  deleteItemNota(itemNotaId: number) {
    return this.http.delete<ItensNota>(`${this.API}/${itemNotaId}`);
  }

}
