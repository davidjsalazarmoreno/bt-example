import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxCurrencyModule } from 'ngx-currency';

import { ClientAreaComponent } from './client-area/client-area.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { BusinessModule } from 'src/app/business/business.module';

@NgModule({
  declarations: [
    ClientAreaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxCurrencyModule,
    BusinessModule,
  ],
  exports: [
    ClientAreaComponent,
  ],
  providers: [],
})
export class ContainersModule {}
