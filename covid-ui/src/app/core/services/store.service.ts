import { Injectable, OnInit } from '@angular/core';

import { CsvDto } from '@app/models/CsvDto';
import { DataSourceFusion } from '@app/models/fusion/DataSourceFusion';
import { FusionDto } from '@app/models/FusionDto';
import { DataSourceMock } from '@shared/constants/data/DataSourceMock';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {

  public mapDataSource$ = new BehaviorSubject<DataSourceFusion>(DataSourceMock);
  public csvInformation$ = new BehaviorSubject<Array<CsvDto>>(null);
  public fusionInformation$ = new BehaviorSubject<Array<FusionDto>>(null);
  public date$ = new BehaviorSubject<Date>(new Date());

  constructor() {
  }

  ngOnInit(): void {
  }
}
