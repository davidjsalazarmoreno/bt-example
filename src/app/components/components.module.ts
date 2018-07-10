import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';

import { ExchangesSelectorComponent } from './exchanges-selector/exchanges-selector.component';

@NgModule({
  declarations: [
    ExchangesSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  exports: [
    ExchangesSelectorComponent
  ],
  providers: [],
})
export class ComponentsModule { }
