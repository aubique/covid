import { TypeInfoEnum } from '@app/models/enums/type-info.enum';

export const MaxvalueListInit = {
  [TypeInfoEnum.Hosp]: 1220,
  [TypeInfoEnum.Rea]: 216,
  [TypeInfoEnum.Rad]: 8139,
  [TypeInfoEnum.Dc]: 2047,
} as Record<TypeInfoEnum, number>;
