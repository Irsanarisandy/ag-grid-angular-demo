import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTooltipComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([CustomTooltipComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
