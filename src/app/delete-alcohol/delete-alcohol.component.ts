import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-alcohol',
  templateUrl: './delete-alcohol.component.html',
  styleUrls: ['./delete-alcohol.component.scss']
})
export class DeleteAlcoholComponent implements ICellRendererAngularComp {
  private parent: any;

  agInit(params: any): void {
    this.parent = params.context.componentParent;
  }

  refresh = () => false;

  btnClicked(): void {
    this.parent.deleteAlcohol();
  }
}
