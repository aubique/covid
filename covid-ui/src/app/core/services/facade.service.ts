import { Injectable, OnInit } from '@angular/core';

import { ApiService } from '@app/http/api.service';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { FusionDto } from '@app/models/fusion-dto';
import { LoaderService } from '@app/services/loader.service';
import { MapperService } from '@app/services/mapper.service';
import { OpencovidService } from '@app/services/opencovid.service';
import { StoreService } from '@app/services/store.service';

import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FacadeService implements OnInit {

  private fusionSubscription: Subscription;
  private typeSubscription: Subscription;

  constructor(
    private store: StoreService,
    private api: ApiService,
    private opencovid: OpencovidService,
    private mapper: MapperService,
    private loader: LoaderService,
  ) {
  }

  ngOnInit(): void {
  }

  get csvList$(): BehaviorSubject<Array<CsvDto>> {
    return this.store.csvList$;
  }

  get fusionList$(): BehaviorSubject<Array<FusionDto>> {
    return this.store.fusionList$;
  }

  get mapDatasource$(): BehaviorSubject<DatasourceFusion> {
    return this.store.mapDatasource$;
  }

  get typeInfo$(): BehaviorSubject<TypeInfoEnum> {
    return this.store.typeInfo$;
  }

  public loadCsvFromOpencovid(): void {
    this.opencovid.handleCsvFile();
    this.mapper.batchCsv();
  }

  public loadMap(): void {
    this.fusionSubscription = this.loader.triggerByFusionList();
    this.typeSubscription = this.loader.triggerByTypeInfo();
  }

  public unloadMap(): void {
    this.fusionSubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }

  public initTypeFromLocalStorage(): void {
    this.loader.loadTypeInfo();
  }

  public saveTypeToLocalStorage(typeInfoEnum: TypeInfoEnum): void {
    this.loader.saveTypeInfo(typeInfoEnum);
  }
}