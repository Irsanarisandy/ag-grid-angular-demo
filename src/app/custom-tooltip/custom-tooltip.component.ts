import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular/dist/interfaces';
import { AlcoholDrink } from '../data/alcohol-drink';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements ITooltipAngularComp {
  public data: AlcoholDrink;

  agInit(params: any): void {
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
  }
}
