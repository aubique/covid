import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PrettyjsonPipe } from '@shared/pipe/prettyjson.pipe';
import { FusionChartsModule } from 'angular-fusioncharts';
import { BrandComponent } from './components/brand/brand.component';
import { LocaleComponent } from './components/locale/locale.component';
import { RadioComponent } from './components/radio/radio.component';


registerLocaleData(localeFr);
registerLocaleData(localeRu);

@NgModule({
  declarations: [
    PrettyjsonPipe,
    RadioComponent,
    LocaleComponent,
    BrandComponent,
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
    // Shared Components
    PrettyjsonPipe,
    RadioComponent,
    LocaleComponent,
    BrandComponent,
  ],
})
export class SharedModule {
}
