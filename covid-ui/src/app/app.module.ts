import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@app/core.module';
import { ContentModule } from '@modules/content/content.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    // Page modules
    ContentModule,
    // Core & Shared
    CoreModule,
    SharedModule,
    FontAwesomeModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
