import { ChartFusion } from '@app/models/fusion/chart-fusion';
import { ColorrangeFusion } from '@app/models/fusion/colorrange-fusion';
import { CasesData } from '@app/models/cases-data';

export interface DatasourceFusion {
  chart: ChartFusion;
  colorrange: ColorrangeFusion;
  data: CasesData[];
}
