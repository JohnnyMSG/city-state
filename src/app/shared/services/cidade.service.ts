import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../models/cidade';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly API = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

  constructor(private http: HttpClient) { }

  idEstadoTemp!: number;

  getCidades(idEstado: number): Observable<Cidade[]> {
    this.idEstadoTemp = idEstado
    return this.http.get<Cidade[]>(`${this.API}/${idEstado}/municipios`)
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.microrregiao.mesorregiao.UF.id == idEstado))
    );
  }

  searchById(idCidade: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.API}/${this.idEstadoTemp}/municipios`)
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.id == idCidade))
    );;
  }

  searchByName(nomeCidade: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.API}/${this.idEstadoTemp}/municipios`)
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.nome == nomeCidade))
    );
  }

}

// {
//   "id": 3103504,
//   "nome": "Araguari",
//   "microrregiao": {
//     "id": 31018,
//     "nome": "Uberlândia",
//     "mesorregiao": {
//       "id": 3105,
//       "nome": "Triângulo Mineiro/Alto Paranaíba",
//       "UF": {
//         "id": 31,
//         "sigla": "MG",
//         "nome": "Minas Gerais",
//         "regiao": {
//           "id": 3,
//           "sigla": "SE",
//           "nome": "Sudeste"
//         }
//       }
//     }
//   },
