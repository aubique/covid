import { TypeInfoEnum } from '@app/models/enums/type-info.enum';

export const MaxvalueListMock = {
  [TypeInfoEnum.Hosp]: 806,
  [TypeInfoEnum.Rea]: 75,
  [TypeInfoEnum.Rad]: 5964,
  [TypeInfoEnum.Dc]: 1739,
} as Record<TypeInfoEnum, number>;
