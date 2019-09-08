import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable, of } from 'rxjs';

import { AlcoholDrink } from './data/alcohol-drink';
import { AlcoholImageComponent } from './alcohol-image/alcohol-image.component';
import { AlcoholButtonComponent } from './alcohol-button/alcohol-button.component';
import { AlcoholFullInfoComponent } from './alcohol-full-info/alcohol-full-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid', { static: false }) public agGrid: AgGridAngular;

  private drinks: AlcoholDrink[];
  private gridApi: any;

  public columnDefs: object[];
  public rowData: Observable<AlcoholDrink[]>;
  public frameworkComponents: object;
  public context: object;
  public loadingOverlayComponent: string;
  public loadingOverlayComponentParams: object;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: true, rowDrag: true },
      { headerName: 'Alcohol Name', field: 'name', sortable: true, filter: true, minWidth: 160, cellClass: 'cell-space', editable: true },
      { headerName: 'Alcohol Thumbnail', field: 'thumbnail', cellRenderer: 'alcoholImage', autoHeight: true },
      { headerName: 'Alcohol Category', field: 'category', sortable: true, filter: true, minWidth: 180, cellClass: 'cell-space' },
      { headerName: 'Alcohol Glass', field: 'glass', sortable: true, filter: true, minWidth: 160, cellClass: 'cell-space', editable: true },
      { headerName: 'Full Info', colId: 'fullInfo', cellRenderer: 'alcoholButton', autoHeight: true, cellClass: 'cell-button' }
    ];
    this.frameworkComponents = {
      alcoholImage: AlcoholImageComponent,
      alcoholButton: AlcoholButtonComponent,
      alcoholFullInfo: AlcoholFullInfoComponent
    };
    this.context = { componentParent: this };
    this.loadingOverlayComponent = 'alcoholFullInfo';
    this.loadingOverlayComponentParams = {
      alcoholData: {},
      hideOverlay: Function,
      hidden: true
    };
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic').subscribe((res1: object) => {
      this.drinks = res1['drinks'].map((item: object) => {
        return {
          id: item['idDrink'],
          name: item['strDrink'],
          thumbnail: item['strDrinkThumb']
        };
      });
      for (let drink of this.drinks) {
        let info: object;
        this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.id}`).subscribe((res2: object) => {
          info = res2['drinks'][0];
          drink.category = info['strCategory'];
          drink.glass = info['strGlass'];
          drink.instructions = info['strInstructions'];
          drink.ingredients = [];

          let curIngredient: string;
          for (let i = 1; i < 16; i++) {
            curIngredient = info['strIngredient' + i];
            if (curIngredient !== '') {
              drink.ingredients.push(curIngredient);
            } else {
              break;
            }
          }
        });
      }
      this.rowData = of(this.drinks);
    });
    this.loadingOverlayComponentParams['hideOverlay'] = () => this.gridApi.hideOverlay();
    this.loadingOverlayComponentParams['hidden'] = false;
  }

  onFirstDataRendered(params: any): void {
    const gridColumnApi = params.columnApi;
    gridColumnApi.autoSizeColumns(['id', 'name', 'category', 'glass']);
  }

  selectedAlcohol(curData: AlcoholDrink): void {
    this.loadingOverlayComponentParams['alcoholData'] = curData;
    this.gridApi.showLoadingOverlay();
  }
}
