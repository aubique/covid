import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CsvPageComponent } from '@shared/components/csv-page/csv-page.component';
import { FrancePageComponent } from '@shared/components/france-page/france-page.component';
import { PrettyjsonPipe } from '@shared/pipe/prettyjson.pipe';
import { FusionChartsModule } from 'angular-fusioncharts';
import { RadioComponent } from './components/radio/radio.component';


@NgModule({
  declarations: [
    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
    RadioComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // 3rd Party
    NgbModule,
    FontAwesomeModule,
    FusionChartsModule,
  ],
  exports: [
    // Angular
    FormsModule,
    ReactiveFormsModule,
    // 3rd Party libs
    NgbModule,
    FontAwesomeModule,
    FusionChartsModule,
    // Test Pages and Pipe
    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
    RadioComponent,
  ],
})
export class SharedModule {
}
