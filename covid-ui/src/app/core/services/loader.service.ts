import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private store: StoreService,
    private router: Router,
  ) {
  }

  public navigateTo(typeInfo: TypeInfoEnum): void {
    const url = typeInfo.toString();

    this.router.navigate([url]);
  }

  public triggerByFusionList(): Subscription {
    return this.store.fusionList$.pipe(
      filter(list => list !== null),
    ).subscribe((fusionList) => {
      const lastTypeInfo = this.store.typeInfo$.getValue();
      // console.log('FUSION LIST has been changed');
      const maxValue = this.store.maxvalueMap$.getValue().get(lastTypeInfo);

      const dataList = MapperHelper.toDateList(lastTypeInfo, fusionList);
      const colorRange = FactoryHelper.newColorrange(maxValue);
      const mapDataSource = FactoryHelper.newMapDataSource(dataList, colorRange);

      this.store.mapDatasource$.next(mapDataSource);
    });
  }

  public triggerByTypeInfo(): Subscription {
    return this.store.typeInfo$
      .subscribe((typeInfo) => {
        const lastFusionList = this.store.fusionList$.getValue();
        console.log('TYPE INFO has been changed');
        const maxValue = this.store.maxvalueMap$.getValue().get(typeInfo);

        const dataList = MapperHelper.toDateList(typeInfo, lastFusionList);
        const colorRange = FactoryHelper.newColorrange(maxValue);
        const mapDataSource = FactoryHelper.newMapDataSource(dataList, colorRange);

        this.store.mapDatasource$.next(mapDataSource);
      });
  }

  public loadTypeInfo(): void {
    let typeInfoEnum = FactoryHelper.newTypeInfoEnum(TypeInfoEnum.Hosp.toString());
    const typeInfoStr = localStorage.getItem(LoaderService.STORAGE_TYPE_INFO);
    console.log('local storage:', typeInfoStr);

    if (typeInfoStr)
      typeInfoEnum = FactoryHelper.newTypeInfoEnum(typeInfoStr);

    if (typeInfoEnum !== TypeInfoEnum.Default) {
      // this.store.typeInfo$ = new BehaviorSubject<TypeInfoEnum>(typeInfoEnum);
      this.store.typeInfo$.next(typeInfoEnum);
      console.log('Trigger: new TypeInfoEnum BH-Subject');
      console.log(typeInfoEnum);
    }

    this.navigateTo(this.store.typeInfo$.getValue());
  }

  public saveTypeInfo(typeInfoEnum: TypeInfoEnum): void {
    localStorage.setItem(LoaderService.STORAGE_TYPE_INFO, typeInfoEnum.toString());
  }

  public forwardResolve(typeInfoStr: string): TypeInfoEnum {
    const typeInfoEnum = FactoryHelper.newTypeInfoEnum(typeInfoStr);

    this.store.typeInfo$.next(typeInfoEnum);
    return typeInfoEnum;
  }
}
