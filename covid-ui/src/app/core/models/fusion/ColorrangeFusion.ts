import { ColorFusion } from '@app/models/fusion/ColorFusion';

export interface ColorrangeFusion {

  minvalue: number,
  startlabel: string,
  endlabel: string,
  code: string,
  gradient: number,
  color: ColorFusion[];
}
