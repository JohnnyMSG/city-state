import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { DxSelectBoxModule } from 'devextreme-angular';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../models/estado';
import { Cidade } from '../../models/cidade';
import { CidadeService } from '../../services/cidade.service';

@Component({
  selector: 'state-city',
  templateUrl: './state-city.component.html',
  styleUrl: './state-city.component.scss'
})
export class StateCityComponent {

  estados: Estado[] = [];
  cidades: Cidade[] = [];
  estadoSelecionado!: Estado;
  cidadeSelecionada!: Cidade;
  idEstadoInicial!: number; 
  idCidadeInicial!: number; 


  @Output() outputCidade: EventEmitter<string> = new EventEmitter<string>();
  @Output() outputEstado: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private estadoService: EstadoService,
    private cidadeService: CidadeService
  ) {}

  ngOnInit() {
    this.estadoService.getEstados().subscribe(data => {
      this.estados = data;
    });

    this.idEstadoInicial = 31; //ID MINAS GERAIS
    this.onChangeState(this.idEstadoInicial);
    this.idCidadeInicial = 3170206; //ID UBERLÂNDIA
    this.selectedCity(this.idCidadeInicial);
  }
  
  getDisplayText(item: any): string {
    if (item) {
      return `${item.sigla} - ${item.nome}`;
    }
    return '';
  }

  onChangeState(idEstado: number) {
    this.cidadeService.getCidades(idEstado).subscribe(data => {
      this.cidades = data;
    });

    this.selectedState(idEstado);
  }

  selectedState(idEstado: number) {
    this.estadoService.searchById(idEstado).subscribe(estado => {
      this.estadoSelecionado = estado;
      this.estadoOutput();
      console.log(this.estadoSelecionado.nome);
    });

  }

  selectedCity(idCidade: number) {
    this.cidadeService.searchById(idCidade).subscribe(cidade => {
      this.cidadeSelecionada = cidade[0];
      this.cidadeOutput();
      console.log(this.cidadeSelecionada.nome);
    });
  }

  estadoOutput() {
    this.outputEstado.emit(this.estadoSelecionado.nome);
    console.log("Output: " + this.estadoSelecionado.nome);
  }

  cidadeOutput() {
    this.outputCidade.emit(this.cidadeSelecionada.nome);
    console.log("Output: " + this.cidadeSelecionada.nome);
  }
  
}

@NgModule({
  imports: [
    DxSelectBoxModule
  ],
  declarations: [ StateCityComponent ],
  exports: [ StateCityComponent ],
})
export class StateCityModule { }

//
