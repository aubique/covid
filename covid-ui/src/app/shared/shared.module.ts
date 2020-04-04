import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrancePageComponent } from '@shared/components/france-page/france-page.component';

import { MaterialModule } from '@shared/material.module';
import { FusionChartsModule } from 'angular-fusioncharts';
import { CsvPageComponent } from './components/csv-page/csv-page.component';
import { PrettyjsonPipe } from './pipe/prettyjson.pipe';


@NgModule({
  declarations: [
    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    // FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    FusionChartsModule,
  ],
  exports: [
    MaterialModule,
    //FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    FusionChartsModule,

    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
  ],
})
export class SharedModule {
}
