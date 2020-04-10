import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CsvPageComponent } from '@shared/components/csv-page/csv-page.component';
import { FrancePageComponent } from '@shared/components/france-page/france-page.component';
import { MaterialModule } from '@shared/material.module';
import { PrettyjsonPipe } from '@shared/pipe/prettyjson.pipe';

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
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    FusionChartsModule,
  ],
  exports: [
    // Angular
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    // 3rd Party Lib
    FusionChartsModule,
    // Test Pages and Pipe
    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
  ],
})
export class SharedModule {
}
