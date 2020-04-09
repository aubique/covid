import { Injectable } from '@angular/core';

import { CsvDto } from '@app/models/CsvDto';
import { FusionDto } from '@app/models/FusionDto';
import { StoreService } from '@app/services/store.service';
import { FactoryHelper } from '@shared/util/factory-helper';

import { filter, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class MapperService {

  constructor(
    private store: StoreService,
  ) {
  }

  public batchCsv(): void {
    this.store.csvInformation$
      .pipe(
        filter((list) => list !== null),
        map((csvList) => {
          console.log('BATCH CSV DTO');
          console.log(csvList);//TODO remove output

          return MapperService.toDataInfoList(csvList);
        }))
      .subscribe((fusionList) => {
        console.log('BATCH FUSION DTO');
        console.log(fusionList);//TODO remove

        const mapData = FactoryHelper.newMapDataSource(fusionList);
        this.store.mapDataSource$.next(mapData);
      });
  }

  private static toDataInfoList(csvList: CsvDto[]): FusionDto[] {
    const dataList = new Array<FusionDto>();
    csvList.forEach(csv =>
      dataList.push(MapperService.toDateInfo(csv)));

    return dataList;
  }

  private static toDateInfo(csv: CsvDto): FusionDto {
    const id = csv.department;
    const hosp = csv.hosp;
    const rea = csv.rea;
    const rad = csv.rad;
    const dc = csv.dc;

    const hospObj = FactoryHelper.newDataDefault(id, hosp);
    const reaObj = FactoryHelper.newDataDefault(id, rea);
    const radObj = FactoryHelper.newDataDefault(id, rad);
    const dcObj = FactoryHelper.newDataDefault(id, dc);

    return FactoryHelper.newDateInfo(hospObj, reaObj, radObj, dcObj);
  }
}
