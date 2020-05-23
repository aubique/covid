import { Injectable, OnInit } from '@angular/core';

import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { DatasourceMock } from '@shared/constants/data/datasource.mock';
import { FusionListMock } from '@shared/constants/data/fusion-list.mock';
import { FactoryHelper } from '@shared/util/factory-helper';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {

  public mapDatasource$ = new BehaviorSubject<DatasourceFusion>(DatasourceMock);
  public csvList$ = new BehaviorSubject<Array<CsvDto>>(null);
  public fusionList$ = new BehaviorSubject<Array<FusionDto>>(FusionListMock);
  public date$ = new BehaviorSubject<Date>(new Date());
  public typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Default);//TODO watch it
  public maxvalueMap$ = new BehaviorSubject<Map<TypeInfoEnum, number>>(FactoryHelper.newMaxvalueMap());

  constructor() {
  }

  ngOnInit(): void {
  }
}
