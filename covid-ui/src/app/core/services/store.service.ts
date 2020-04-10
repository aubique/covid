import { Injectable, OnInit } from '@angular/core';

import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { FusionDto } from '@app/models/fusion-dto';
import { DatasourceMock } from '@shared/constants/data/datasource.mock';
import { FusionListMock } from '@shared/constants/data/fusion-list.mock';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {

  public mapDatasource$ = new BehaviorSubject<DatasourceFusion>(DatasourceMock);
  public csvList$ = new BehaviorSubject<Array<CsvDto>>(null);
  public fusionList$ = new BehaviorSubject<Array<FusionDto>>(FusionListMock);
  public date$ = new BehaviorSubject<Date>(new Date());
  public typeInfo$: BehaviorSubject<TypeInfoEnum>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
