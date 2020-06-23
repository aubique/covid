import { HttpClient } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core.module';
import { ContentModule } from '@modules/content/content.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // Page modules
    ContentModule,
    // Core & Shared
    CoreModule,
    SharedModule,
    // Ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
