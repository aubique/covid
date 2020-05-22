import { CasesData } from '@app/models/cases-data';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { ColorrangeFusion } from '@app/models/fusion/colorrange-fusion';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { DepartmentCode } from '@shared/constants/code/department-code';
import { ChartMock } from '@shared/constants/data/chart.mock';
import { ColorCodeMock } from '@shared/constants/data/color-code.mock';
import { MaxvalueListMock } from '@shared/constants/data/maxvalue-list.mock';
import { BehaviorSubject } from 'rxjs';


export class FactoryHelper {

  public static newCsvDto(department: string, gender: number,
                          date: Date, hosp: number, rea: number,
                          rad: number, dc: number): CsvDto {
    return {
      department: department,
      gender: gender,
      date: date,
      hosp: hosp,
      rea: rea,
      rad: rad,
      dc: dc,
    } as CsvDto;
  }

  public static newDataDefault(departmentId: string,
                               value: number): CasesData {
    return {
      id: DepartmentCode[departmentId],
      value: value,
    } as CasesData;
  }

  // public static newDateInfo(
  //   hospObj: CasesData, reaObj: CasesData, radObj: CasesData,
  //   dcObj: CasesData, label?: string): FusionDto {
  //
  //   return {
  //     hosp: hospObj,
  //     rea: reaObj,
  //     rad: radObj,
  //     dc: dcObj,
  //     label: label,
  //   } as FusionDto;
  // }

  public static newDateInfo(id: string, hosp: number, rea: number,
                            rad: number, dc: number, label?: string): FusionDto {
    const hospObj = FactoryHelper.newDataDefault(id, hosp);
    const reaObj = FactoryHelper.newDataDefault(id, rea);
    const radObj = FactoryHelper.newDataDefault(id, rad);
    const dcObj = FactoryHelper.newDataDefault(id, dc);

    return {
      hosp: hospObj,
      rea: reaObj,
      rad: radObj,
      dc: dcObj,
      label: label,
    } as FusionDto;
  }

  public static newMapDataSource(dataList: Array<CasesData>,
                                 colorRange: ColorrangeFusion): DatasourceFusion {
    return {
      chart: ChartMock,
      colorrange: colorRange,
      data: dataList,
    } as DatasourceFusion;
  }

  public static newTypeSubject(typeInfoStr: string): BehaviorSubject<TypeInfoEnum> {
    switch (typeInfoStr) {
      case TypeInfoEnum.Hosp.toString():
        return new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Hosp);
      case TypeInfoEnum.Rea.toString():
        return new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Rea);
      case TypeInfoEnum.Rad.toString():
        return new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Rad);
      case TypeInfoEnum.Dc.toString():
        return new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Dc);
      default:
        return new BehaviorSubject<TypeInfoEnum>(TypeInfoEnum.Hosp);
    }
  }

  public static newColorrange(maxValue: number) {
    const minimumColor = ColorCodeMock.green;
    const mediumColor = ColorCodeMock.yellow;
    const maximumColor = ColorCodeMock.red;

    return {
      minvalue: 0,
      startlabel: 'Low',
      endlabel: 'High',
      code: minimumColor,
      gradient: 1,
      color: [
        {maxvalue: Number(maxValue / 2), code: mediumColor},
        {maxvalue: maxValue, code: maximumColor},
      ],
    } as ColorrangeFusion;
  }

  public static newMaxvalueMap(): Map<TypeInfoEnum, number> {
    const maxvalues = new Map<TypeInfoEnum, number>();

    maxvalues.set(TypeInfoEnum.Hosp, MaxvalueListMock[TypeInfoEnum.Hosp]);
    maxvalues.set(TypeInfoEnum.Rea, MaxvalueListMock[TypeInfoEnum.Rea]);
    maxvalues.set(TypeInfoEnum.Rad, MaxvalueListMock[TypeInfoEnum.Rad]);
    maxvalues.set(TypeInfoEnum.Dc, MaxvalueListMock[TypeInfoEnum.Dc]);

    return maxvalues;
  }
}
