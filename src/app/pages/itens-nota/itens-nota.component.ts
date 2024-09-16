import {Component, NgModule} from '@angular/core';
import {DxButtonModule, DxFormModule, DxPopupModule, DxScrollViewModule, DxTreeListModule} from "devextreme-angular";
import {
  DxiColumnModule,
  DxiItemModule,
  DxiValidationRuleModule,
  DxoEditingModule,
  DxoFormModule,
  DxoHeaderFilterModule,
  DxoPagerModule,
  DxoPagingModule,
  DxoPopupModule,
  DxoScrollingModule,
  DxoSearchPanelModule
} from "devextreme-angular/ui/nested";
import {PopupModule} from "../../shared/components/popup/popup.component";
import {ItensNotaService} from "../../shared/services/itensNota/itens-nota.service";
import {ItensNota} from "../../shared/models/itensNota";
import {NotaService} from "../../shared/services/notas/nota.service";
import {ProdutoService} from "../../shared/services/produtos/produto.service";
import {Nota} from "../../shared/models/nota";
import {Produto} from "../../shared/models/produto";
import {ListModule} from "../../shared/components/list/list.component";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'app-itens-nota',
  templateUrl: './itens-nota.component.html',
  styleUrl: './itens-nota.component.scss'
})
export class ItensNotaComponent {

  itensNota: ItensNota[] = [];
  itensNotaCriada: ItensNota = new ItensNota();
  notas: Nota[] = [];
  produtos: Produto[] = [];

  apenasDigitosPattern = /^[\d.,]+$/;

  novoItemNota: ItensNota = new ItensNota();

  quantidadeValida: boolean = false;
  numeroNotaValido: boolean = false;
  nomeProdutoValido: boolean = false;
  botaoDesativado: boolean = true;

  constructor(
    private serviceItensNota: ItensNotaService,
    private serviceNota: NotaService,
    private serviceProduto: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarItensNota();
  }

  carregarItensNota() {
    this.serviceItensNota.getItensNota().subscribe(dadosItensNota => {
      this.itensNota = dadosItensNota
    });

    this.serviceNota.getNotas().subscribe(dadosNotas => {
      this.notas = dadosNotas
    });

    this.serviceProduto.getProdutos().subscribe(dadosProdutos => {
      this.produtos = dadosProdutos
    });
  }

  criarItemNota(evento : any) {
    this.itensNotaCriada = {
      id: evento.id,
      numeroNota: evento.numeroNota,
      quantidade: evento.quantidade,
      valor_total: evento.valor_total,
      produtos: evento.produtos,
      nomeProduto: evento.produtos.nome,
    }
    this.serviceItensNota.postItemNota(this.itensNotaCriada).subscribe(() => {
      console.log("Item da nota criado com sucesso!");
      this.carregarItensNota();
    })
  }

  deletarItemNota(evento: any) {
    this.serviceItensNota.deleteItemNota(evento.id).subscribe(() => {
      console.log("Item da nota deletado com sucesso!");
      this.carregarItensNota();
    });
  }

  atualizarItemNota(evento: any) {
    console.log(evento)
    this.serviceItensNota.updateItemNota(evento.id, evento).subscribe(() => {
      console.log("Item da nota atualizado com sucesso!");
    });
  }

  quantidadeEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.quantidadeValida = e.value.length >= 1 && this.apenasDigitosPattern.test(e.value);
      this.validadeBotao();
    }
  };

  numeroNotaEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.numeroNotaValido = e.value.length >= 1 && this.apenasDigitosPattern.test(e.value);
      this.validadeBotao();
    }
  };

  validadeBotao() {
    this.botaoDesativado = !(this.quantidadeValida);
  }

}

@NgModule({
  declarations: [
    ItensNotaComponent
  ],
  exports: [
    ItensNotaComponent
  ],
  imports: [
    DxButtonModule,
    DxFormModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTreeListModule,
    DxiColumnModule,
    DxiItemModule,
    DxiValidationRuleModule,
    DxoEditingModule,
    DxoFormModule,
    DxoHeaderFilterModule,
    DxoPagerModule,
    DxoPagingModule,
    DxoPopupModule,
    DxoScrollingModule,
    DxoSearchPanelModule,
    PopupModule,
    ListModule
  ]
})
export class ItensNotaModule { }
