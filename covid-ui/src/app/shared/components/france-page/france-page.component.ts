import { Component, OnInit } from '@angular/core';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { FacadeService } from '@app/services/facade.service';
import { ChartMock } from '@shared/constants/data/chart.mock';
import { ColorrangeMock } from '@shared/constants/data/colorrange.mock';
import { DatalistMock } from '@shared/constants/data/datalist.mock';


@Component({
  selector: 'app-france-page',
  templateUrl: './france-page.component.html',
  styleUrls: ['./france-page.component.scss'],
})
export class FrancePageComponent implements OnInit {

  dataSource: DatasourceFusion;
  title = 'France map';

  constructor(private facade: FacadeService) {
    this.dataSource = {
      chart: ChartMock,
      colorrange: ColorrangeMock,
      data: DatalistMock,
    } as DatasourceFusion;
  }

  ngOnInit(): void {
    this.facade.loadCsvFromOpencovid();
  }
}
