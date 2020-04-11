import { Injectable } from '@angular/core';

import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { StoreService } from '@app/services/store.service';
import { FactoryHelper } from '@shared/util/factory-helper';
import { MapperHelper } from '@shared/util/mapper-helper';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private static readonly STORAGE_TYPE_INFO = 'type-info';

  constructor(private store: StoreService) {
  }

  public triggerByFusionList(): Subscription {
    return this.store.fusionList$.pipe(
      filter(list => list !== null))
      .subscribe((fusionList) => {
        const lastTypeInfo = this.store.typeInfo$.getValue();
        console.log('FUSION LIST has been changed');

        const dataList = MapperHelper.toDateList(lastTypeInfo, fusionList);
        const mapDataSource = FactoryHelper.newMapDataSource(dataList);

        this.store.mapDatasource$.next(mapDataSource);
      });
  }

  public triggerByTypeInfo(): Subscription {
    return this.store.typeInfo$
      .subscribe((typeInfo) => {
        const lastFusionList = this.store.fusionList$.getValue();
        console.log('TYPE INFO has been changed');

        const dataList = MapperHelper.toDateList(typeInfo, lastFusionList);
        const mapDataSource = FactoryHelper.newMapDataSource(dataList);

        this.store.mapDatasource$.next(mapDataSource);
      });
  }

  public saveTypeInfo(typeInfoEnum: TypeInfoEnum): void {
    localStorage.setItem(LoaderService.STORAGE_TYPE_INFO, typeInfoEnum.toString());
    this.store.typeInfo$.next(typeInfoEnum);
  }

  public loadTypeInfo(): void {
    let typeInfoStr: string;

    typeInfoStr = localStorage.getItem(LoaderService.STORAGE_TYPE_INFO);
    this.store.typeInfo$ = FactoryHelper.newTypeSubject(typeInfoStr);
  }
}
