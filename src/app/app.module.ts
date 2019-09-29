import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { DemoOneComponent } from './demo-one/demo-one.component';
import { DemoTwoComponent } from './demo-two/demo-two.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomTooltipComponent,
    DemoOneComponent,
    DemoTwoComponent
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
