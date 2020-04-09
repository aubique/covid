import { Injectable, OnInit } from '@angular/core';

import { ApiService } from '@app/http/api.service';
import { CsvDto } from '@app/models/CsvDto';
import { DataSourceFusion } from '@app/models/fusion/DataSourceFusion';
import { MapperService } from '@app/services/mapper.service';
import { OpencovidService } from '@app/services/opencovid.service';
import { StoreService } from '@app/services/store.service';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FacadeService implements OnInit {

  constructor(
    private store: StoreService,
    private api: ApiService,
    private opencovid: OpencovidService,
    private mapper: MapperService,
  ) {
  }

  ngOnInit(): void {
  }

  get informationList$(): BehaviorSubject<Array<CsvDto>> {
    return this.store.csvInformation$;
  }

  get mapDataSource$(): BehaviorSubject<DataSourceFusion> {
    return this.store.mapDataSource$;
  }

  public loadCsvFromOpencovid(): void {
    this.opencovid.handleCsvFile();
    this.mapper.batchCsv();
  }
}
