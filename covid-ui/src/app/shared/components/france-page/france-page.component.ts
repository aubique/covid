import { Component, OnInit } from '@angular/core';
import { DataSourceFusion } from '@app/models/fusion/DataSourceFusion';
import { FacadeService } from '@app/services/facade.service';
import { ChartMock } from '@shared/constants/data/ChartMock';
import { ColorrangeMock } from '@shared/constants/data/ColorrangeMock';
import { DataListMock } from '@shared/constants/data/DataListMock';


@Component({
  selector: 'app-france-page',
  templateUrl: './france-page.component.html',
  styleUrls: ['./france-page.component.scss'],
})
export class FrancePageComponent implements OnInit {

  dataSource: DataSourceFusion;
  title = 'France map';

  constructor(private facade: FacadeService) {
    this.dataSource = {
      chart: ChartMock,
      colorrange: ColorrangeMock,
      data: DataListMock,
    } as DataSourceFusion;
  }

  ngOnInit(): void {
    this.facade.loadCsvFromOpencovid();
  }
}
