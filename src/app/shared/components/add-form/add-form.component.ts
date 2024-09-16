import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {DxFormModule, DxScrollViewModule} from "devextreme-angular";
import {DxiItemModule, DxoEditingModule, DxoFormModule} from "devextreme-angular/ui/nested";
import {PopupModule} from "../popup/popup.component";
import {Fornecedor} from "../../models/fornecedor";

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
export class AddFormComponent {

  @Input() tipo: any;
  @Output() tipoChange: EventEmitter<any> = new EventEmitter<any>();

}

@NgModule({
  imports: [
    DxFormModule,
    DxScrollViewModule,
    DxiItemModule,
    PopupModule,
    DxoEditingModule,
    DxoFormModule
  ],
  declarations: [ AddFormComponent ],
  exports: [ AddFormComponent ],
})
export class AddFormModule {}

