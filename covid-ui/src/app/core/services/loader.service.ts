import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { Language } from '@app/models/misc/language';
import { LocaleService } from '@app/services/locale.service';
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
    private locale: LocaleService,
  ) {
  }

  public navigateTo(typeInfo: TypeInfoEnum): void {
    const url = typeInfo.toString();

    this.router.navigate([url]);
  }

  private triggerByFusionList(): Subscription {
    return this.store.fusionList$.pipe(
      filter(list => list !== null),
    ).subscribe((fusionList) => {
      const lastTypeInfo = this.store.typeInfo$.getValue();
      const lastLanguage = this.store.language$.getValue();
      // console.log('FUSION LIST has been changed');

      this.pushMapDatasource(lastTypeInfo, fusionList, lastLanguage);
    });
  }

  private triggerByTypeInfo(): Subscription {
    return this.store.typeInfo$
      .subscribe((typeInfo) => {
        const lastFusionList = this.store.fusionList$.getValue();
        const lastLanguage = this.store.language$.getValue();
        // console.log('TYPE INFO has been changed');

        this.pushMapDatasource(typeInfo, lastFusionList, lastLanguage);
      });
  }

  private triggerByLanguage(): Subscription {
    return this.store.language$.pipe(
      filter(l => l !== null),
    ).subscribe((language) => {
      const lastFusionList = this.store.fusionList$.getValue();
      const lastTypeInfo = this.store.typeInfo$.getValue();
      // console.log('LANGUAGE has been changed');

      this.pushMapDatasource(lastTypeInfo, lastFusionList, language);
    });
  }

  private pushMapDatasource(
    typeInfo: TypeInfoEnum,
    fusionList: Array<FusionDto>,
    language: Language,
  ): void {
    const maxValue = this.store.maxvalueMap$.getValue().get(typeInfo);
    const date = this.store.lastDate$.getValue();

    const colorRange = this.locale.proceedColorrange(maxValue);
    const chartCaption = this.locale.proceedChart(date, language);
    const dataList = MapperHelper.toDateList(typeInfo, fusionList);

    const mapDataSource = FactoryHelper.newMapDataSource(dataList, colorRange, chartCaption);

    this.store.mapDatasource$.next(mapDataSource);
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

  public subscribeFusionCharts(): Array<Subscription> {
    const subscriptions = new Array<Subscription>();

    subscriptions.push(this.triggerByTypeInfo());
    subscriptions.push(this.triggerByFusionList());
    subscriptions.push(this.triggerByLanguage());

    return subscriptions;
  }
}
