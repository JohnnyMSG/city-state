import { Component, NgModule } from '@angular/core';
import { StateCityModule } from '../../shared/components';
import { CommonModule } from '@angular/common';
import { Estado } from '../../shared/models/estado';
import { Cidade } from '../../shared/models/cidade';

@Component({
  selector: 'localizacao',
  templateUrl: './localizacao.component.html',
  styleUrl: './localizacao.component.scss'
})
export class LocalizacaoComponent {

  teste: Estado = {} as Estado;
  cidadeSelecionada: Cidade = {} as Cidade;

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
