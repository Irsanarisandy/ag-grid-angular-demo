import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable, of } from 'rxjs';

import 'ag-grid-enterprise';

import { AlcoholDrink } from '../data/alcohol-drink';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';

@Component({
  selector: 'app-demo-one',
  templateUrl: './demo-one.component.html',
  styleUrls: ['./demo-one.component.scss']
})
export class DemoOneComponent {
  @ViewChild('agGrid', { static: false }) public agGrid: AgGridAngular;

  private categoryParams: string[];
  private glassParams: string[];
  private drinks: AlcoholDrink[];
  private gridApi: any;

  public columnDefs: object[];
  public defaultColDef: object;
  public frameworkComponents: object;
  public rowData: Observable<AlcoholDrink[]>;
  public rowSelection: string;
  public sideBar: object;
  public popupParent: HTMLElement;

  constructor(private http: HttpClient) {
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').subscribe((res: object) => {
      this.categoryParams = res['drinks'].map((item: object) => item['strCategory']).sort();
    });
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list').subscribe((res: object) => {
      this.glassParams = res['drinks'].map((item: object) => item['strGlass']).sort();
    });
    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter', rowDrag: true, tooltipField: 'id' },
      { headerName: 'Alcohol Name', field: 'name', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, tooltipField: 'name' },
      {
        headerName: 'Alcohol Thumbnail', field: 'thumbnail', autoHeight: true, cellClass: 'cell-image',
        cellRenderer: (params: any) => `<img src="${params.value}" />`
      },
      {
        headerName: 'Alcohol Category', field: 'category', sortable: true, filter: 'agSetColumnFilter', minWidth: 180,
        cellClass: 'cell-space', editable: true, tooltipField: 'category', cellEditorSelector: () => ({
          component: 'agRichSelectCellEditor',
          params: { values: this.categoryParams }
        })
      },
      {
        headerName: 'Alcohol Glass', field: 'glass', sortable: true, filter: 'agSetColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, tooltipField: 'glass', cellEditorSelector: () => ({
          component: 'agRichSelectCellEditor',
          params: { values: this.glassParams }
        })
      },
      { headerName: 'Alcohol Instructions', field: 'instructions', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, cellEditor: 'agLargeTextCellEditor' },
      { headerName: 'Alcohol Ingredients', field: 'ingredients', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, cellEditor: 'agLargeTextCellEditor' },
      {
        headerName: 'Save Edits', colId: 'saveEdits', autoHeight: true, cellClass: 'cell-button',
        cellRenderer: (params: any) => `<button class="btn btn-primary" type="button" (click)="${() => this.editAlcohol()}">
                                          <i class="ag-icon ag-icon-save"></i>&nbsp;Save Edits
                                        </button>`
      },
      {
        headerName: 'Delete Alcohol', colId: 'deleteAlcohol', autoHeight: true, cellClass: 'cell-button',
        cellRenderer: (params: any) => `<button class="btn btn-danger" type="button" (click)="${() => this.deleteAlcohol()}">
                                          <i class="ag-icon ag-icon-cut"></i>&nbsp;Delete Alcohol
                                        </button>`
      }
    ];
    this.defaultColDef = {
      tooltipComponent: 'customTooltip'
    };
    this.frameworkComponents = { customTooltip: CustomTooltipComponent };
    this.rowSelection = 'single';
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

  getContextMenuItems = (params: any) => [
    {
      name: 'Delete',
      action: () => this.deleteAlcohol(),
      icon: '<i class="ag-icon ag-icon-cut"></i>'
    },
    'separator',
    'copy',
    'paste',
    'separator',
    'export'
  ]

  onGridReady(params: any): void {
    // set the context menu to be outside of ag-grid for better user experience
    this.popupParent = document.getElementById('gridDemo').parentElement;

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
    const focusedCellIndex = this.gridApi.getFocusedCell().rowIndex;  // get the row index of cell that has clicked element
    const rowData = this.gridApi.getDisplayedRowAtIndex(focusedCellIndex).data;  // get the data of that row
    this.gridApi.updateRowData({ remove: [rowData] });  // remove the data from ag-grid
    this.gridApi.clearFocusedCell();  // remove focused cell info
  }
}
