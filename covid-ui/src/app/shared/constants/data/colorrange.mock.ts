import { ColorrangeFusion } from '@app/models/fusion/colorrange-fusion';

export const ColorrangeMock = {
  minvalue: 0,
  startlabel: 'Low',
  endlabel: 'High',
  code: '6baa01',
  gradient: 1,
  color: [{maxvalue: 500, code: 'f8bd19'}, {maxvalue: 1000, code: 'e44a00'}],
} as ColorrangeFusion;
