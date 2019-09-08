import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AlcoholDrink } from '../data/alcohol-drink';

@Component({
  selector: 'app-alcohol-button',
  templateUrl: './alcohol-button.component.html',
  styleUrls: ['./alcohol-button.component.scss']
})
export class AlcoholButtonComponent implements ICellRendererAngularComp {
  private alcoholData: AlcoholDrink;
  private parent: any;

  agInit(params: any): void {
    this.alcoholData = params.node.data;
    this.parent = params.context.componentParent;
  }

  refresh = () => false;

  alcoholClicked(): void {
    this.parent.selectedAlcohol(this.alcoholData);
  }
}
