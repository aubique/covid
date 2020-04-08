import { Component, OnInit } from '@angular/core';
import { CsvDto } from '@app/models/CsvDto';
import { FacadeService } from '@app/services/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-csv-page',
  templateUrl: './csv-page.component.html',
  styleUrls: ['./csv-page.component.scss'],
})
export class CsvPageComponent implements OnInit {

  csvInformation$: Observable<Array<CsvDto>>;

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.facade.loadCsvFromOpencovid();
    this.csvInformation$ = this.facade.informationList$;
  }
}
