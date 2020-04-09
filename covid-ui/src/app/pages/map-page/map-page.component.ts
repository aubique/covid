import { Component, OnInit } from '@angular/core';

import { DataSourceFusion } from '@app/models/fusion/DataSourceFusion';
import { FacadeService } from '@app/services/facade.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit {

  mapData: BehaviorSubject<DataSourceFusion>;
  title = 'France departments';

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.mapData = this.facade.mapDataSource$;
    this.facade.loadCsvFromOpencovid();
  }
}
