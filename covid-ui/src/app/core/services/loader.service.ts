import { Injectable } from '@angular/core';

import { CasesData } from '@app/models/cases-data';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { StoreService } from '@app/services/store.service';
import { FactoryHelper } from '@shared/util/factory-helper';

import { BehaviorSubject, Subscription } from 'rxjs';
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

        const dataList = LoaderService.toDateList(lastTypeInfo, fusionList);
        const mapDataSource = FactoryHelper.newMapDataSource(dataList);

        this.store.mapDatasource$.next(mapDataSource);
      });
  }

  public triggerByTypeInfo(): Subscription {
    return this.store.typeInfo$
      .subscribe((typeInfo) => {
        const lastFusionList = this.store.fusionList$.getValue();
        console.log('TYPE INFO has been changed');

        const dataList = LoaderService.toDateList(typeInfo, lastFusionList);
        const mapDataSource = FactoryHelper.newMapDataSource(dataList);

        this.store.mapDatasource$.next(mapDataSource);
      });
  }

  //TODO put it to mapper-helper.ts
  private static toDateList(typeInfo: TypeInfoEnum, fusionList: Array<FusionDto>): Array<CasesData> {
    const dataList = new Array<CasesData>();

    fusionList.forEach(dto => {
      const dataTypeChosen = this.determineDataType(typeInfo, dto);
      dataList.push(dataTypeChosen);
    });

    return dataList;
  }

  private static determineDataType(typeInfo: TypeInfoEnum, dto: FusionDto): CasesData {
    switch (typeInfo) {
      case TypeInfoEnum.Hosp:
        return dto.hosp;
      case TypeInfoEnum.Rea:
        return dto.rea;
      case TypeInfoEnum.Rad:
        return dto.rad;
      case TypeInfoEnum.Dc:
        return dto.dc;
      default:
        return dto.hosp;
    }
  }

  public saveTypeInfo(typeInfoEnum: TypeInfoEnum): void {
    localStorage.setItem(LoaderService.STORAGE_TYPE_INFO, typeInfoEnum.toString());
    this.store.typeInfo$.next(typeInfoEnum);
  }

  public loadTypeInfo(): void {
    let typeInfoStr: string;

    typeInfoStr = localStorage.getItem(LoaderService.STORAGE_TYPE_INFO);
    this.initTypeSubject(typeInfoStr);
  }

  private initTypeSubject(typeInfoStr: string): void {
    switch (typeInfoStr) {
      case TypeInfoEnum.Hosp.toString():
        this.store.typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Hosp);
        break;
      case TypeInfoEnum.Rea.toString():
        this.store.typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Rea);
        break;
      case TypeInfoEnum.Rad.toString():
        this.store.typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Rad);
        break;
      case TypeInfoEnum.Dc.toString():
        this.store.typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Dc);
        break;
      default:
        this.store.typeInfo$ = new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Hosp);
        break;
    }
  }
}
