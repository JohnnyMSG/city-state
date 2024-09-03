import { Component, NgModule } from '@angular/core';
import { StateCityModule } from '../../shared/components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'localizacao',
  templateUrl: './localizacao.component.html',
  styleUrl: './localizacao.component.scss'
})
export class LocalizacaoComponent {

  estadoSelecionado!: string;
  cidadeSelecionada!: string;

  onEstado(value: string) {
    this.estadoSelecionado = value;
  }

  onCidade(value: string) {
    this.cidadeSelecionada = value;
  }

}

@NgModule({
  declarations: [
    LocalizacaoComponent
  ],
  imports: [
    CommonModule,
    StateCityModule
  ]
})
export class LocalizacaoModule { }
