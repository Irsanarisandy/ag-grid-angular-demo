import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlcoholImageComponent } from './alcohol-image/alcohol-image.component';
import { EditAlcoholComponent } from './edit-alcohol/edit-alcohol.component';
import { DeleteAlcoholComponent } from './delete-alcohol/delete-alcohol.component';

@NgModule({
  declarations: [
    AppComponent,
    AlcoholImageComponent,
    EditAlcoholComponent,
    DeleteAlcoholComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([
      AlcoholImageComponent,
      EditAlcoholComponent,
      DeleteAlcoholComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
