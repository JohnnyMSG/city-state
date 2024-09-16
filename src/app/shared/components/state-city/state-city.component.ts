import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
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
  idEstadoInicial!: number;
  idCidadeInicial!: number;


  @Input() estadoSelecionado!: Estado;
  @Output() estadoSelecionadoChange: EventEmitter<Estado> = new EventEmitter<Estado>();

  @Input() cidadeSelecionada!: Cidade;
  @Output() cidadeSelecionadaChange: EventEmitter<Cidade> = new EventEmitter<Cidade>();

  @Input() siglaEstadoInicial!: string;
  @Input() nomeCidadeInicial!: string;

  constructor(
    private estadoService: EstadoService,
    private cidadeService: CidadeService
  ) {}

  ngOnInit() {
    this.loadStates();
    this.initialValueState();
  }

  //Carrega os dados dos Estados
  loadStates() {
    this.estadoService.getEstados().subscribe(dadosEstados => {
      this.estados = dadosEstados;
    });
  }

  //Carrega os dados das Cidades
  loadCities(idEstado: number) {
    this.cidadeService.getCidades(idEstado).subscribe(dataCidade => {
      this.cidades = dataCidade;
    });

    this.selectState(idEstado);
  }

  //Valor inicial do Estado pela sigla
  initialValueState() {
    this.estadoService.searchBySigla(this.siglaEstadoInicial).subscribe(estado => {
      this.idEstadoInicial = estado.id;

      this.loadCities(this.idEstadoInicial);
      this.initialValueCity();
    });;
  }

  //Valor inicial da Cidade pelo nome
  initialValueCity() {
    this.cidadeService.searchByName(this.nomeCidadeInicial).subscribe(cidade => {
      this.idCidadeInicial = cidade[0].id;
    });
  }

  //Texto formatado com a sigla e o nome do estado (SP - São Paulo)
  textFormatted(item: any): string {
    if (item) {
      return `${item.sigla} - ${item.nome}`;
    }
    return '';
  }

  //Seleciona o Estado
  selectState(idEstado: number) {
    this.estadoService.searchById(idEstado).subscribe(estado => {
      this.estadoSelecionado = estado;
      this.estadoOutput();
      this.cidadeSelecionada = new Cidade()
      this.cidadeOutput();
      console.log(this.estadoSelecionado.nome);
    });
  }

  //Seleciona a Cidade
  selectCity(idCidade: number) {
    this.cidadeService.searchById(idCidade).subscribe(cidade => {
      this.cidadeSelecionada = Array.isArray(cidade) ? cidade[0] : cidade;
      this.cidadeOutput();
      console.log(this.cidadeSelecionada.nome);
    });
  }

  //Emite com o output o estado para fora do componente para ser usado por outros componentes
  estadoOutput() {
    this.estadoSelecionadoChange.emit(this.estadoSelecionado);
    console.log("Output: " + this.estadoSelecionado.nome);
  }

  //Emite com o output a cidade para fora do componente para ser usado por outros componentes
  cidadeOutput() {
    this.cidadeSelecionadaChange.emit(this.cidadeSelecionada);
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
