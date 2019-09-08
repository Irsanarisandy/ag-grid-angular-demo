import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-alcohol-image',
  templateUrl: './alcohol-image.component.html',
  styleUrls: ['./alcohol-image.component.scss']
})
export class AlcoholImageComponent implements ICellRendererAngularComp {
  public imageSrc: string;

  agInit(params: any): void {
    this.imageSrc = params.value;
  }

  refresh = () => false;
}
