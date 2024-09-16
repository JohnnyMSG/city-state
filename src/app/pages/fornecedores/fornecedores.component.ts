import {Component, NgModule} from '@angular/core';
import {StateCityModule} from "../../shared/components";
import {ListModule} from "../../shared/components/list/list.component";
import {Fornecedor} from "../../shared/models/fornecedor";
import {FornecedorService} from "../../shared/services/fornecedores/fornecedor.service";
import {
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSpeedDialActionModule,
  DxTreeListModule
} from "devextreme-angular";
import {DxiToolbarItemModule} from "devextreme-angular/ui/nested";
import {PopupModule} from "../../shared/components/popup/popup.component";
import {AddFormModule} from "../../shared/components/add-form/add-form.component";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {NotaService} from "../../shared/services/notas/nota.service";
import {Nota} from "../../shared/models/nota";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss'
})
export class FornecedoresComponent {

  fornecedores: Fornecedor[] = [];
  notas: Nota[] = [];
  novoFornecedor: Fornecedor = new Fornecedor();

  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  codigoFornecedorValido: boolean = false;
  nomeValido: boolean = false;
  botaoDesativado: boolean = true;
  notaComFornecedorExistente: boolean = false;

  constructor(
    public serviceFornecedor: FornecedorService,
    public serviceNotas: NotaService
  ) {
  }

  ngOnInit() {
    this.carregarFornecedores();
    this.carregarNotas();
  }

  carregarFornecedores() {
    this.serviceFornecedor.getFornecedores().subscribe(dadosFornecedores => {
      this.fornecedores = dadosFornecedores;
    });
  }

  carregarNotas() {
    this.serviceNotas.getNotas().subscribe(dadosNotas => {
      this.notas = dadosNotas;
    });
  }

  criarFornecedor(fornecedor: Fornecedor) {
    this.serviceFornecedor.postFornecedor(fornecedor).subscribe(() => {
      console.log("Fornecedor criado com sucesso!");
      this.carregarFornecedores();
    });
  }

  deletarFornecedor(evento: any) {
    for (let nota of this.notas) {
      if (evento.nome == nota.fornecedor.nome) {
        this.notaComFornecedorExistente = true
        return;
      }
    }
    this.serviceFornecedor.deleteFornecedores(evento.id).subscribe(() => {
      console.log("Fornecedor deletado com sucesso!");
      this.carregarFornecedores();
    });
  }

  atualizarFornecedor(evento: any) {
    this.serviceFornecedor.updateFornecedores(evento.id, evento).subscribe(() => {
      console.log("Fornecedor atualizado com sucesso!");
    });
  }

  codigoFornecedorEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.codigoFornecedorValido = e.value.length >= 1 && this.apenasDigitosPattern.test(e.value);
      this.validadeBotao();
    }
  };

  nomeEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.nomeValido = e.value.length >= 5 && this.apenasStringPattern.test(e.value);
      this.validadeBotao();
    }
  };

  validadeBotao() {
    this.botaoDesativado = !(this.nomeValido && this.codigoFornecedorValido);
  }

  fecharAviso() {
    this.notaComFornecedorExistente = false;
  }
}

@NgModule({
  declarations: [
    FornecedoresComponent,
  ],
  imports: [
    ListModule,
    PopupModule,
    AddFormModule,
    StateCityModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSpeedDialActionModule,
    DxiToolbarItemModule,
    DxFormModule,
    DxTreeListModule,
    DxButtonModule,
  ]
})
export class FornecedoresModule { }
