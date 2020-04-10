import { CasesData } from '@app/models/cases-data';

export interface FusionDto {

  hosp: CasesData;
  rea: CasesData;
  rad: CasesData;
  dc: CasesData;
  label?: string;
}
