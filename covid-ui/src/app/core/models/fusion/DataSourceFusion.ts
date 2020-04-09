import { ChartFusion } from '@app/models/fusion/ChartFusion';
import { ColorrangeFusion } from '@app/models/fusion/ColorrangeFusion';
import { DataFusion } from '@app/models/DataFusion';

export interface DataSourceFusion {
  chart: ChartFusion;
  colorrange: ColorrangeFusion;
  data: DataFusion[];
}
