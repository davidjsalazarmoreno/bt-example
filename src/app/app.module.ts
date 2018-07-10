import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ContainersModule } from './containers/containers.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ContainersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
