import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CsvPageComponent } from '@shared/components/csv-page/csv-page.component';
import { FrancePageComponent } from '@shared/components/france-page/france-page.component';
import { PrettyjsonPipe } from '@shared/pipe/prettyjson.pipe';
import { FusionChartsModule } from 'angular-fusioncharts';
import { LocaleComponent } from './components/locale/locale.component';
import { RadioComponent } from './components/radio/radio.component';


registerLocaleData(localeFr);
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
    RadioComponent,
    LocaleComponent,
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
    TranslateModule,
  ],
  exports: [
    // Angular
    FormsModule,
    ReactiveFormsModule,
    // 3rd Party libs
    NgbModule,
    FontAwesomeModule,
    FusionChartsModule,
    TranslateModule,
    // Test Pages and Pipe
    FrancePageComponent,
    CsvPageComponent,
    PrettyjsonPipe,
    RadioComponent,
    LocaleComponent,
  ],
})
export class SharedModule {
}
