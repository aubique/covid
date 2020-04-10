import { Injectable } from '@angular/core';

import { ApiService } from '@app/http/api.service';
import { CsvDto } from '@app/models/csv-dto';
import { StoreService } from '@app/services/store.service';
import { CovidHelper } from '@shared/util/covid-helper';
import { FactoryHelper } from '@shared/util/factory-helper';


@Injectable({
  providedIn: 'root',
})
export class OpencovidService {

  constructor(
    private store: StoreService,
    private api: ApiService,
  ) {
  }

  public handleCsvFile(): void {
    this.api.fetchOpencovidCsv().subscribe(data => {
      const lines = data.split('\n');
      //const columnNames = lines[0].split(FacadeService.SEPARATOR_FIELDS);
      const infoDtoList = this.compileTodayList(lines);

      console.log('HANDLE CSV FILE');
      console.log(infoDtoList);

      this.store.csvList$.next(infoDtoList);
    });
  }

  private compileTodayList(lines: string[]): CsvDto[] {
    const infoDtoList = new Array<CsvDto>();
    const lastLineIndex = lines.length - 2;

    const lastDate = this.handleLastTime(lines[lastLineIndex]);
    console.log('LAST DATE:');//TODO remove output
    console.log(lastDate);

    for (let i = lastLineIndex; i > 0; i--) {
      const lineFields: string[] = lines[i].split(CovidHelper.FIELD_SEPARATOR);
      const gender = lineFields[1];
      const currentDate = lineFields[2];

      if (lastDate == CovidHelper.unifyDate(currentDate))
        if (CovidHelper.isGenderZero(gender)) {
          const infoDto = FactoryHelper.newCsvInfo(lineFields);
          infoDtoList.push(infoDto);
        }
    }

    return infoDtoList;
  }

  private handleLastTime(lastLine: string) {
    const dateObj = CovidHelper.extractDate(lastLine);
    this.store.date$.next(dateObj);

    return CovidHelper.convertDate(dateObj);
  }
}
