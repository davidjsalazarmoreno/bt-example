import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';

import { AppComponent } from './app.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { ClientAreaComponent } from './containers/client-area/client-area.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyExchangeComponent,
    ClientAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
