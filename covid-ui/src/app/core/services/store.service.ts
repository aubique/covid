import { Injectable, OnInit } from '@angular/core';

import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { Language } from '@app/models/misc/language';
import { LocaleService } from '@app/services/locale.service';
import { DatasourceMock } from '@shared/constants/data/datasource.mock';
import { FusionListMock } from '@shared/constants/data/fusion-list.mock';
import { LanguagesDefault } from '@shared/constants/default/languages.default';
import { FactoryHelper } from '@shared/util/factory-helper';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {

  public mapDatasource$ = new BehaviorSubject<DatasourceFusion>(DatasourceMock);
  public csvList$ = new BehaviorSubject<Array<CsvDto>>(null);
  public fusionList$ = new BehaviorSubject<Array<FusionDto>>(FusionListMock);
  public lastDate$ = new BehaviorSubject<Date>(new Date());
  public typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Default);
  public maxvalueMap$ = new BehaviorSubject<Map<TypeInfoEnum, number>>(FactoryHelper.newMaxvalueMap());
  public language$ = new BehaviorSubject<Language>(null);//TODO verify for setDefaultLang

  constructor() {
  }

  ngOnInit(): void {
  }
}
