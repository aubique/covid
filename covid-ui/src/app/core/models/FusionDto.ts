import { DataFusion } from '@app/models/DataFusion';

export interface FusionDto {

  hosp: DataFusion;
  rea: DataFusion;
  rad: DataFusion;
  dc: DataFusion;
  label?: string;
}
