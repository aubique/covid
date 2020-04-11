import { Component, OnDestroy, OnInit } from '@angular/core';

import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { FacadeService } from '@app/services/facade.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  mapDataState: BehaviorSubject<DatasourceFusion>;
  title = 'France departments';

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.mapDataState = this.facade.mapDatasource$;
    this.facade.loadCsvFromOpencovid();
    this.facade.loadMap();
  }

  ngOnDestroy(): void {
    this.facade.unloadMap();
  }
}
