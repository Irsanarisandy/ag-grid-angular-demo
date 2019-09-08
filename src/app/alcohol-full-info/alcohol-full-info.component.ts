import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { AlcoholDrink } from '../data/alcohol-drink';

@Component({
  selector: 'app-alcohol-full-info',
  templateUrl: './alcohol-full-info.component.html',
  styleUrls: ['./alcohol-full-info.component.scss']
})
export class AlcoholFullInfoComponent implements ILoadingOverlayAngularComp {
  public alcoholData: AlcoholDrink;
  public hideOverlay: () => void;
  public hidden = true;

  agInit(params: any): void {
    this.alcoholData = params.alcoholData;
    this.hideOverlay = params.hideOverlay;
    this.hidden = params.hidden;
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}
