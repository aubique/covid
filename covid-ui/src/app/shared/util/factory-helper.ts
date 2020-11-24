import { CasesData } from '@app/models/cases-data';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { ChartFusion } from '@app/models/fusion/chart-fusion';
import { ColorrangeFusion } from '@app/models/fusion/colorrange-fusion';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { DepartmentCode } from '@shared/constants/code/department.code';
import { ChartDefault } from '@shared/constants/default/chart.default';
import { ColorCode } from '@shared/constants/code/color.code';
import { MaxvalueListInit } from '@shared/constants/data/maxvalue-list.init';


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

  public static newMapDataSource(
    dataList: Array<CasesData>,
    colorRange: ColorrangeFusion,
    chart: ChartFusion,
  ): DatasourceFusion {
    return {
      chart: chart,
      colorrange: colorRange,
      data: dataList,
    } as DatasourceFusion;
  }

  public static newTypeInfoEnum(typeInfoStr: string): TypeInfoEnum {
    switch (typeInfoStr) {
      case TypeInfoEnum.Hosp.toString():
        return TypeInfoEnum.Hosp;
      case TypeInfoEnum.Rea.toString():
        return TypeInfoEnum.Rea;
      case TypeInfoEnum.Rad.toString():
        return TypeInfoEnum.Rad;
      case TypeInfoEnum.Dc.toString():
        return TypeInfoEnum.Dc;
      default:
        return TypeInfoEnum.Default;
    }
  }

  public static newChart(caption: string): ChartFusion {
    const chart = ChartDefault;
    chart.caption = caption;
    return chart as ChartFusion;
  }

  public static newColorrange(maxValue: number, startlabel: string,
                              endlabel: string): ColorrangeFusion {
    const minimumColor = ColorCode.green;
    const mediumColor = ColorCode.yellow;
    const maximumColor = ColorCode.red;

    return {
      minvalue: 0,
      startlabel: startlabel,
      endlabel: endlabel,
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

    maxvalues.set(TypeInfoEnum.Hosp, MaxvalueListInit[TypeInfoEnum.Hosp]);
    maxvalues.set(TypeInfoEnum.Rea, MaxvalueListInit[TypeInfoEnum.Rea]);
    maxvalues.set(TypeInfoEnum.Rad, MaxvalueListInit[TypeInfoEnum.Rad]);
    maxvalues.set(TypeInfoEnum.Dc, MaxvalueListInit[TypeInfoEnum.Dc]);

    return maxvalues;
  }
}
