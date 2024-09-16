import {Component, NgModule} from '@angular/core';
import {ListModule} from "../../shared/components/list/list.component";
import {ProdutoService} from "../../shared/services/produtos/produto.service";
import {Produto} from "../../shared/models/produto";
import {PopupModule} from "../../shared/components/popup/popup.component";
import {DxFormModule, DxPopupModule, DxScrollViewModule, DxSpeedDialActionModule} from "devextreme-angular";
import {DxiItemModule} from "devextreme-angular/ui/nested";
import {AddFormModule} from "../../shared/components/add-form/add-form.component";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  produtos: Produto[] = [];
  novoProduto: Produto = new Produto();

  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  nomeValido: boolean = false;
  descricaoValida: boolean = false;
  precoValido: boolean = false;

  botaoDesativado: boolean = true;

  constructor(
    public serviceProduto: ProdutoService
  ) {
  }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.serviceProduto.getProdutos().subscribe(dadosProdutos => {
      this.produtos = dadosProdutos;
    });
  }

  criarProduto(produto: Produto) {
    this.serviceProduto.postProduto(produto).subscribe(() => {
      console.log("Produto criado com sucesso!");
      this.carregarProdutos();
    })
  }

  deletarProduto(evento: any) {
    this.serviceProduto.deleteProdutos(evento.id).subscribe(() => {
      console.log("Produto deletado com sucesso!");
      this.carregarProdutos();
    });
  }

  atualizarProduto(evento: any) {
    this.serviceProduto.updateProduto(evento.id, evento).subscribe(() => {
      console.log("Produto atualizado com sucesso!");
    });
  }

  nomeEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.nomeValido = e.value.length >= 5 && this.apenasStringPattern.test(e.value);
      this.validadeBotao();
    }
  };

  descricaoEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.descricaoValida = e.value.length >= 5;
      this.validadeBotao();
    }
  };

  precoEditorOptions: EditorOptions = {
    valueChangeEvent: 'keyup',
    onValueChanged: (e: any) => {
      this.precoValido = e.value.length >= 1 && this.apenasDigitosPattern.test(e.value);
      this.validadeBotao();
    }
  };

  validadeBotao() {
    this.botaoDesativado = !(this.nomeValido && this.descricaoValida && this.precoValido);
  }
}

@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    ListModule,
    PopupModule,
    DxFormModule,
    DxPopupModule,
    DxScrollViewModule,
    DxiItemModule,
    DxSpeedDialActionModule,
    AddFormModule
  ]
})
export class ProdutosModule { }
