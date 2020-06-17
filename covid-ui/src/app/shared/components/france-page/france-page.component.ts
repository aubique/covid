import { Component, OnInit } from '@angular/core';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { FacadeService } from '@app/services/facade.service';
import { ChartDefault } from '@shared/constants/default/chart.default';
import { ColorrangeDefault } from '@shared/constants/default/colorrange.default';
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
      chart: ChartDefault,
      colorrange: ColorrangeDefault,
      data: DatalistMock,
    } as DatasourceFusion;
  }

  ngOnInit(): void {
    this.facade.loadCsvFromOpencovid();
  }
}
