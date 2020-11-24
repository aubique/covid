import {Injectable} from '@angular/core';

import {ApiService} from '@app/http/api.service';
import {CsvDto} from '@app/models/csv-dto';
import {TypeInfoEnum} from '@app/models/enums/type-info.enum';
import {StoreService} from '@app/services/store.service';
import {FusionListInit} from '@shared/constants/data/fusion-list.init';
import {CovidHelper} from '@shared/util/covid-helper';
import {FactoryHelper} from '@shared/util/factory-helper';
import {MapperHelper} from '@shared/util/mapper-helper';
import {filter, map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class OpencovidService {

  constructor(
    private store: StoreService,
    private api: ApiService,
  ) {
  }

  private static updateMaxValues(
    csvObj: CsvDto,
    maxvalues: Map<TypeInfoEnum, number>,
  ): void {

    if (csvObj.hosp > maxvalues.get(TypeInfoEnum.Hosp))
      maxvalues.set(TypeInfoEnum.Hosp, csvObj.hosp);

    if (csvObj.rea > maxvalues.get(TypeInfoEnum.Rea))
      maxvalues.set(TypeInfoEnum.Rea, csvObj.rea);

    if (csvObj.rad > maxvalues.get(TypeInfoEnum.Rad))
      maxvalues.set(TypeInfoEnum.Rad, csvObj.rad);

    if (csvObj.dc > maxvalues.get(TypeInfoEnum.Dc))
      maxvalues.set(TypeInfoEnum.Dc, csvObj.dc);
  }

  private static pushCsvDto(
    infoDtoList: Array<CsvDto>,
    lineFields: Array<string>,
  ): CsvDto {
    let infoDto = MapperHelper.toCsvDto(lineFields);
    // Add Lyon Metropolitan and modify Rhone department
    if (infoDto.department === CovidHelper.RHONE.code) {
      const lyonDepartment = MapperHelper.modCsvDto(
        infoDto, CovidHelper.LYON.multiplier, CovidHelper.LYON.code);

      infoDtoList.push(lyonDepartment);
      infoDto = MapperHelper.modCsvDto(infoDto, CovidHelper.RHONE.multiplier);
    }
    infoDtoList.push(infoDto);

    return infoDto;
  }

  // Called after `handleCsvFile()`
  public batchCsv(): void {
    this.store.csvList$
      .pipe(
        filter((list) => list !== null),
        map((csvList) => {
          //console.log('BATCH CSV DTO');
          //console.log(csvList);
          return MapperHelper.toDataInfoList(csvList);
        }),
      ).subscribe((fusionList) => {
      //console.log('BATCH FUSION DTO');
      //console.log(fusionList);
      this.store.fusionList$.next(fusionList);
    });
  }

  public handleCsvFile(): void {
    this.api.fetchOpencovidCsv().subscribe(data => {
      const lines = data.split('\n');
      console.log('READ RAW LINES');
      console.log(lines);
      //const columnNames = lines[0].split(FacadeService.SEPARATOR_FIELDS);
      const infoDtoList = this.compileTodayList(lines);
      console.log('HANDLE CSV FILE');
      console.log(infoDtoList);
      this.store.csvList$.next(infoDtoList);
    });
  }

  public doAfterAdjust(): void {
    this.store.fusionList$.pipe(
      filter(list => (list !== null) || (list !== FusionListInit)),
      take(3),
      map(list => MapperHelper.modifyList(list)),
    ).subscribe(list => this.store.fusionList$.next(list));
  }

  private compileTodayList(lines: string[]): Array<CsvDto> {
    const csvList = new Array<CsvDto>();
    // Last line indent
    const lastLineIndex = lines.length - 2;
    const maxValues = FactoryHelper.newMaxvalueMap();
    const lastDate = this.handleLastTime(lines[lastLineIndex]);
    console.log('LAST DATE:');
    console.log(lastDate);
    for (let i = lastLineIndex; i > 0; i--) {
      const lineFields: string[] = lines[i].split(CovidHelper.FIELD_SEPARATOR);
      const gender: string = lineFields[1].replace(/["]+/g, '');
      const currentDateObj = CovidHelper.parseDate(lineFields[2]);

      if (lastDate == CovidHelper.convertDate(currentDateObj))
        if (CovidHelper.isGenderZero(gender)) {
          const csv = OpencovidService.pushCsvDto(csvList, lineFields);
          OpencovidService.updateMaxValues(csv, maxValues);
        }
    }
    console.log('MAX VALUES');
    console.log(maxValues);
    this.store.maxvalueMap$.next(maxValues);

    return csvList;
  }

  private handleLastTime(lastLine: string): string {
    const dateObj = CovidHelper.extractDate(lastLine);
    this.store.lastDate$.next(dateObj);

    return CovidHelper.convertDate(dateObj);
  }
}
