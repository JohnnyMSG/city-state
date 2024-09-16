import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSpeedDialActionModule,
  DxSwitchModule
} from "devextreme-angular";
import {BrowserModule} from "@angular/platform-browser";
import {DxButtonModule} from "devextreme-angular/ui/button";
import {DxScrollViewModule} from "devextreme-angular/ui/scroll-view";

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  popupDeleteVisivel: boolean = false;
  value: any;

  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  @Input() lista!: any[];
  @Output() listaChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output() _onPressDeletar: EventEmitter<any> = new EventEmitter<any>();
  @Output() _onPressAtualizar: EventEmitter<any> = new EventEmitter<any>();

  popupConfirmacaoDelete(evento: any) {
    evento.cancel = true;
    console.log(evento.data)
    this.value = evento.data
    this.popupDeleteVisivel = true;
  }

  onPressDeletar() {
    this._onPressDeletar.emit(this.value);
    this.popupDeleteVisivel = false;
  }

  cancelarDelete() {
    this.popupDeleteVisivel = false
  }

  configuracaoEditor(e: any) {
    if (e.dataField === 'id' || e.dataField === 'valor_total') {
      e.editorOptions.disabled = true;
    }
  }

  salvarEdicao(e: any) {
    if (e.newData !== undefined) {
      e = {...e.oldData, ...e.newData}
      this._onPressAtualizar.emit(e)
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
    DxScrollViewModule,
    DxSpeedDialActionModule,
    DxSwitchModule,
    DxFormModule,
  ],
  declarations: [ ListComponent ],
  exports: [ ListComponent ],
})
export class ListModule {}
