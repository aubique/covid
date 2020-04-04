import { Component, OnInit } from '@angular/core';
import { InfoDto } from '@app/models/InfoDto';
import { CovidService } from '@app/services/covid.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-csv-page',
  templateUrl: './csv-page.component.html',
  styleUrls: ['./csv-page.component.scss'],
})
export class CsvPageComponent implements OnInit {

  csvInformation$: Observable<Array<InfoDto>>;

  constructor(private service: CovidService) {
  }

  ngOnInit(): void {
    this.service.handleCsvFile();
    this.csvInformation$ = this.service.informationList$;
  }
}
