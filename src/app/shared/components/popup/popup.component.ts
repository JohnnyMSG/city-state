import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {DxButtonModule, DxButtonTypes} from "devextreme-angular/ui/button";
import {BrowserModule} from "@angular/platform-browser";
import {
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxSpeedDialActionModule,
  DxTreeListModule
} from "devextreme-angular";
import {DxScrollViewModule} from "devextreme-angular/ui/scroll-view";
import {ListModule} from "../list/list.component";
import {FornecedorService} from "../../services/fornecedores/fornecedor.service";

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  @Input() novoDado: any;
  @Output() novoDadoChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() _onPressCriar: EventEmitter<any> = new EventEmitter<any>();

  @Input() botao: any;
  @Output() botaoChange: EventEmitter<any> = new EventEmitter<any>();

  popupVisivel = false;

  configBotao: DxButtonTypes.Properties = {
    width: 250,
    text: 'Salvar',
    type: 'default',
    stylingMode: 'contained',
    onClick: () => {
      this._onPressCriar.emit(this.novoDado);
      this.popupVisivel = false;
      useSubmitBehavior: true;
    },
  };

  abrirPopup() {
    this.popupVisivel = !this.popupVisivel;
  }

}

@NgModule({
  imports: [
    BrowserModule,
    DxTreeListModule,
    DxPopupModule,
    DxButtonModule,
    DxScrollViewModule,
    DxSpeedDialActionModule,
    DxSelectBoxModule,
    DxFormModule,
    ListModule,
  ],
  declarations: [ PopupComponent ],
  exports: [ PopupComponent ],
})
export class PopupModule {}
