import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

import 'ag-grid-enterprise';

import { AlcoholDrink } from '../data/alcohol-drink';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';

@Component({
  selector: 'app-demo-two',
  templateUrl: './demo-two.component.html',
  styleUrls: ['./demo-two.component.scss']
})
export class DemoTwoComponent {
  @ViewChild('agGrid', { static: false }) public agGrid: AgGridAngular;

  private categoryParams: string[];
  private glassParams: string[];
  private gridApi: any;

  public columnDefs: object[];
  public defaultColDef: object;
  public autoGroupColumnDef: object;
  public frameworkComponents: object;
  public rowSelection: string;
  public sideBar: object;
  public popupParent: HTMLElement;

  constructor(private http: HttpClient) {
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').subscribe((res: object) => {
      this.categoryParams = res['drinks'].map((item: object) => item['strCategory']).sort();
      this.initializeData();
    });
    this.http.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list').subscribe((res: object) => {
      this.glassParams = res['drinks'].map((item: object) => item['strGlass']).sort();
    });
    this.columnDefs = [
      { headerName: 'ID', field: 'id', sortable: true, filter: 'agNumberColumnFilter', rowDrag: true, tooltipField: 'id', hide: true },
      { headerName: 'Alcohol Name', field: 'name', sortable: true, filter: 'agTextColumnFilter', minWidth: 160,
        cellClass: 'cell-space', editable: true, tooltipField: 'name' },
      {
        headerName: 'Alcohol Category', field: 'category', sortable: true, filter: 'agSetColumnFilter', minWidth: 180,
        cellClass: 'cell-space', editable: true, tooltipField: 'category', hide: true, cellEditorSelector: () => ({
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
        cellClass: 'cell-space', editable: true, cellEditor: 'agLargeTextCellEditor' }
    ];
    this.defaultColDef = {
      tooltipComponent: 'customTooltip'
    };
    this.autoGroupColumnDef = {
      headerName: 'Alcohol Group',
      cellRendererParams: {
        suppressCount: true
      }
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

  getDataPath = (data: AlcoholDrink) => [data.category, data.id];

  getContextMenuItems = (params: any) => [
    'copy',
    'paste',
    'separator',
    'export'
  ]

  initializeData(): void {
    this.categoryParams.forEach((category: string) => {
      this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).subscribe((currentData: object) => {
        currentData['drinks'].forEach((currentItem: object) => {
          const id = currentItem['idDrink'];
          this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).subscribe((result: object) => {
            const info = result['drinks'][0];
            const currentDrink = {
              id: parseInt(info['idDrink'], 10),
              name: info['strDrink'],
              thumbnail: info['strDrinkThumb'],
              category: info['strCategory'],
              glass: info['strGlass'],
              instructions: info['strInstructions'],
              ingredients: [],
            };
            let curIngredient: string;
            for (let i = 1; i < 16; i++) {
              curIngredient = info['strIngredient' + i];
              if (curIngredient !== '') {
                currentDrink.ingredients.push(curIngredient);
              } else {
                break;
              }
            }
            this.gridApi.updateRowData({ add: [currentDrink] });
          });
        });
      });
    });
  }

  onGridReady(params: any): void {
    // set the context menu to be outside of ag-grid for better user experience
    this.popupParent = document.getElementById('gridDemo').parentElement;

    this.gridApi = params.api;
  }

  onFirstDataRendered(params: any): void {
    const gridColumnApi = params.columnApi;
    gridColumnApi.autoSizeColumns(['id', 'name', 'category', 'glass']);
  }
}
