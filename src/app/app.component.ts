import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable, of } from 'rxjs';

import 'ag-grid-enterprise';

import { AlcoholDrink } from './data/alcohol-drink';
import { AlcoholImageComponent } from './alcohol-image/alcohol-image.component';
import { EditAlcoholComponent } from './edit-alcohol/edit-alcohol.component';
import { DeleteAlcoholComponent } from './delete-alcohol/delete-alcohol.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid', { static: false }) public agGrid: AgGridAngular;

  private categoryParams: string[];
  private glassParams: string[];
  private drinks: AlcoholDrink[];
  private gridApi: any;

  public columnDefs: object[];
  public rowData: Observable<AlcoholDrink[]>;
  public rowSelection: string;
  public frameworkComponents: object;
  public context: object;
  public sideBar: object;

  constructor(private http: HttpClient) {
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').subscribe((res: object) => {
      this.categoryParams = res['drinks'].map((item: object) => item['strCategory']).sort();
    });
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list').subscribe((res: object) => {
      this.glassParams = res['drinks'].map((item: object) => item['strGlass']).sort();
    });
    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter', rowDrag: true },
      { headerName: 'Alcohol Name', field: 'name', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true },
      { headerName: 'Alcohol Thumbnail', field: 'thumbnail', cellRenderer: 'alcoholImage', autoHeight: true },
      {
        headerName: 'Alcohol Category', field: 'category', sortable: true, filter: 'agSetColumnFilter', minWidth: 180,
        cellClass: 'cell-space', editable: true, cellEditorSelector: () => ({
          component: 'agRichSelectCellEditor',
          params: { values: this.categoryParams }
        })
      },
      {
        headerName: 'Alcohol Glass', field: 'glass', sortable: true, filter: 'agSetColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, cellEditorSelector: () => ({
          component: 'agRichSelectCellEditor',
          params: { values: this.glassParams }
        })
      },
      { headerName: 'Alcohol Instructions', field: 'instructions', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, cellEditor: 'agLargeTextCellEditor' },
      { headerName: 'Alcohol Ingredients', field: 'ingredients', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, cellEditor: 'agLargeTextCellEditor' },
      { headerName: 'Save Edits', colId: 'saveEdits', cellRenderer: 'editAlcohol', autoHeight: true, cellClass: 'cell-button' },
      { headerName: 'Delete Alcohol', colId: 'deleteAlcohol', cellRenderer: 'deleteAlcohol', autoHeight: true, cellClass: 'cell-button' }
    ];
    this.rowSelection = 'single';
    this.frameworkComponents = {
      alcoholImage: AlcoholImageComponent,
      editAlcohol: EditAlcoholComponent,
      deleteAlcohol: DeleteAlcoholComponent
    };
    this.context = { componentParent: this };
    this.sideBar = {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        }
      ]
    };
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic').subscribe((res1: object) => {
      this.drinks = res1['drinks'].map((item: object) => ({
        id: parseInt(item['idDrink'], 10),
        name: item['strDrink'],
        thumbnail: item['strDrinkThumb']
      }));
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
  }

  onFirstDataRendered(params: any): void {
    const gridColumnApi = params.columnApi;
    gridColumnApi.autoSizeColumns(['id', 'name', 'category', 'glass']);
  }

  editAlcohol(): void {
    console.log(this.gridApi.getSelectedRows());
  }

  deleteAlcohol(): void {
    this.gridApi.updateRowData({ remove: this.gridApi.getSelectedRows() });
  }
}
