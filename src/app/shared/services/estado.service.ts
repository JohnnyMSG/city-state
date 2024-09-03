import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private readonly API = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
  
  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.API)
    .pipe();
  }

  searchById(id: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.API}/${id}`);
  }

  searchBySigla(sigla: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.API}/${sigla}`);
  }
}
