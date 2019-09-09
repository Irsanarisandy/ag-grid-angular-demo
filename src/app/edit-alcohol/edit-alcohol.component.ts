import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-edit-alcohol',
  templateUrl: './edit-alcohol.component.html',
  styleUrls: ['./edit-alcohol.component.scss']
})
export class EditAlcoholComponent implements ICellRendererAngularComp {
  private parent: any;

  agInit(params: any): void {
    this.parent = params.context.componentParent;
  }

  refresh = () => false;

  btnClicked(): void {
    this.parent.editAlcohol();
  }
}
