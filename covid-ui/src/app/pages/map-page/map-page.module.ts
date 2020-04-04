import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FusionChartsModule } from 'angular-fusioncharts';

import * as FusionCharts from 'fusioncharts';
import * as FusionMaps from 'fusioncharts/fusioncharts.maps';
import * as FranceMap from 'fusioncharts/maps/fusioncharts.france';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { MapPageComponent } from './map-page.component';


FusionChartsModule.fcRoot(FusionCharts, FranceMap, FusionMaps, FusionTheme);

@NgModule({
  declarations: [MapPageComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MapPageComponent,
  ],
})
export class MapPageModule {
}
