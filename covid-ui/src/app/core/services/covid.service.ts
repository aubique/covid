import { Injectable, OnInit } from '@angular/core';

import { ApiService } from '@app/http/api.service';
import { InfoDto } from '@app/models/InfoDto';
import { StoreService } from '@app/services/store.service';
import { HelperCovid } from '@shared/util/helper-covid';
import { HelperFactory } from '@shared/util/helper-factory';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CovidService implements OnInit {

  constructor(
    private store: StoreService,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
  }

  get informationList$(): BehaviorSubject<Array<InfoDto>> {
    return this.store.informationList$;
  }

  //TODO move methods to Handlers
  public handleCsvFile(): void {
    this.api.fetchOpencovidCsv().subscribe(data => {
      const lines = data.split('\n');
      //const columnNames = lines[0].split(CovidService.SEPARATOR_FIELDS);
      const infoDtoList = this.compileTodayList(lines);

      this.store.informationList$.next(infoDtoList);
    });
  }

  private compileTodayList(lines: string[]): InfoDto[] {
    const infoDtoList = new Array<InfoDto>();
    const lastLineIndex = lines.length - 2;

    const lastDate = this.handleLastTime(lines[lastLineIndex]);
    console.log('LAST DATE:');//TODO remove output
    console.log(lastDate);

    for (let i = lastLineIndex; i > 0; i--) {
      const lineFields: string[] = lines[i].split(HelperCovid.FIELD_SEPARATOR);
      const gender = lineFields[1];
      const currentDate = lineFields[2];

      if (lastDate == HelperCovid.unifyDate(currentDate))
        if (HelperCovid.isGenderZero(gender)) {
          const infoDto = HelperFactory.createInformationDto(lineFields);
          infoDtoList.push(infoDto);
        }
    }

    return infoDtoList;
  }

  private handleLastTime(lastLine: string) {
    const dateObj = HelperCovid.extractDate(lastLine);
    this.store.date$.next(dateObj);

    return HelperCovid.convertDate(dateObj);
  }
}
