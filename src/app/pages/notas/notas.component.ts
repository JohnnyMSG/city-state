import {Component, NgModule} from '@angular/core';
import {Nota} from "../../shared/models/nota";
import {NotaService} from "../../shared/services/notas/nota.service";
import {ListModule} from "../../shared/components/list/list.component";
import {PopupModule} from "../../shared/components/popup/popup.component";
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule
} from "devextreme-angular";
import {
  DxiColumnModule,
  DxoEditingModule,
  DxoFormModule,
  DxoHeaderFilterModule,
  DxoPagerModule,
  DxoPagingModule,
  DxoPopupModule,
  DxoScrollingModule,
  DxoSearchPanelModule
} from "devextreme-angular/ui/nested";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {FornecedorService} from "../../shared/services/fornecedores/fornecedor.service";
import {Fornecedor} from "../../shared/models/fornecedor";
import {ItensNotaService} from "../../shared/services/itensNota/itens-nota.service";
import {ItensNota} from "../../shared/models/itensNota";
import {ItensNotaModule} from "../itens-nota/itens-nota.component";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.scss'
})
export class NotasComponent {

  popupDeleteVisivel: boolean = false;
  value: any;

  notas: Nota[] = [];
  novaNota: Nota = new Nota();
  notaCriada: Nota = new Nota();
  fornecedores: Fornecedor[] = [];
  itensNota: ItensNota[] = [];

  apenasDigitosPattern = /^[\d.,]+$/;

  numeroValido: boolean = false;
  botaoDesativado: boolean = true;

  constructor(
    private serviceNota: NotaService,
    private serviceFornecedor: FornecedorService,
    private serviceItensNota: ItensNotaService
  ) {}

  ngOnInit() {
    this.carregarNotas();
    this.carregarFornecedores();
    this.carretarItens();
  }

  carregarNotas() {
    this.serviceNota.getNotas().subscribe(dadosNotas => {
      this.notas = dadosNotas;
    });
  }

  carregarFornecedores() {
    this.serviceFornecedor.getFornecedores().subscribe(fornecedoresDados => {
      this.fornecedores = fornecedoresDados;
    })
  }

  carretarItens() {
    this.serviceItensNota.getItensNota().subscribe(itensDados => {
      this.itensNota = itensDados;
    })
  }

  criarNota(nota: Nota) {
    this.notaCriada = {
      id: nota.id,
      numero: nota.numero,
      data: nota.data,
      fornecedor: nota.fornecedor,
      nomeFornecedor: nota.fornecedor.nome,
    };
    this.serviceNota.postNota(this.notaCriada).subscribe(() => {
      console.log("Nota criada com sucesso!");
      this.carregarNotas();
    });
  }

  deletarProduto() {
    this.serviceNota.deleteNota(this.value.id).subscribe(() => {
      console.log("Nota deletada com sucesso!");
      this.carregarNotas();
      this.popupDeleteVisivel = false;
    });
  }

  atualizarProduto(evento: any) {
    console.log(this.notaCriada)
    this.notaCriada = {
      id: evento.id,
      numero: evento.numero,
      data: evento.data,
      fornecedor: evento.fornecedor,
      nomeFornecedor: evento.fornecedor.nome,
    };
    console.log(this.notaCriada)
    this.serviceNota.updateNota(this.notaCriada.id, this.notaCriada).subscribe(() => {
      console.log("Nota atualizada com sucesso!");
    });
  }

  popupConfirmacaoDelete(evento: any) {
    evento.cancel = true;
    this.value = evento.data
    this.popupDeleteVisivel = true;
  }

  cancelarDelete() {
    this.popupDeleteVisivel = false
  }

  editorPreparing(e: any) {
    if (e.dataField === 'id') {
      e.editorOptions.disabled = true;
    } else if (e.dataField === 'data') {
      e.editorOptions.disabled = true;
    }
  }

  customSaveFunction(e: any) {
    if (e.newData !== undefined) {
      e = { ...e.oldData, ...e.newData}
      this.atualizarProduto(e);
    }
  }

  numeroEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.numeroValido = e.value.length >= 1 && this.apenasDigitosPattern.test(e.value);
      this.botaoDesativado = !(this.numeroValido);
    }
  };
}

@NgModule({
  declarations: [
    NotasComponent
  ],
  imports: [
    ListModule,
    PopupModule,
    DxButtonModule,
    DxPopupModule,
    DxDataGridModule,
    DxiColumnModule,
    DxoEditingModule,
    DxoFormModule,
    DxoHeaderFilterModule,
    DxoPagerModule,
    DxoPagingModule,
    DxoPopupModule,
    DxoScrollingModule,
    DxoSearchPanelModule,
    DxFormModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    ItensNotaModule,
  ]
})
export class NotasModule { }
