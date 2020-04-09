import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrettyjsonPipe } from '@app/pipe/prettyjson.pipe';
import { CsvPageComponent } from '@shared/components/csv-page/csv-page.component';
import { FrancePageComponent } from '@shared/components/france-page/france-page.component';

import { MaterialModule } from '@shared/material.module';
import { FusionChartsModule } from 'angular-fusioncharts';


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
