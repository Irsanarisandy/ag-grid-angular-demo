import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlcoholImageComponent } from './alcohol-image/alcohol-image.component';
import { AlcoholButtonComponent } from './alcohol-button/alcohol-button.component';
import { AlcoholFullInfoComponent } from './alcohol-full-info/alcohol-full-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AlcoholImageComponent,
    AlcoholButtonComponent,
    AlcoholFullInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([
      AlcoholImageComponent,
      AlcoholButtonComponent,
      AlcoholFullInfoComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
