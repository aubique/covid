import { Component, OnInit } from '@angular/core';
import { CsvDto } from '@app/models/csv-dto';
import { FusionDto } from '@app/models/fusion-dto';
import { FacadeService } from '@app/services/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-csv-page',
  templateUrl: './csv-page.component.html',
  styleUrls: ['./csv-page.component.scss'],
})
export class CsvPageComponent implements OnInit {

  listState: Observable<Array<CsvDto | FusionDto>>;

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.facade.loadCsvFromOpencovid();
    this.facade.loadMap();
    this.listState = this.facade.fusionList$;
  }
}
