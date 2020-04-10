import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContentComponent } from '@modules/content/content.component';
import { SharedModule } from '@shared/shared.module';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as FusionMaps from 'fusioncharts/fusioncharts.maps';
import * as FranceMap from 'fusioncharts/maps/fusioncharts.france';
import * as FranceDepartment from 'fusioncharts/maps/fusioncharts.francedepartment';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { MapComponent } from './map/map.component';


FusionChartsModule.fcRoot(FusionCharts, FranceMap, FranceDepartment, FusionMaps, FusionTheme);

@NgModule({
  declarations: [
    ContentComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ContentComponent,//TODO should be removed
  ],
})
export class ContentModule {
}
