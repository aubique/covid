import { CasesData } from '@app/models/cases-data';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { ChartMock } from '@shared/constants/data/chart.mock';
import { ColorrangeMock } from '@shared/constants/data/colorrange.mock';
import { DepartmentCode } from '@shared/constants/code/department-code';
import { BehaviorSubject } from 'rxjs';


export class FactoryHelper {

  public static newCsvInfo(csvFields: string[]): CsvDto {

    return {
      department: csvFields[0].replace(/^"|"$/g, ''),
      gender: Number(csvFields[1]),
      date: new Date(Date.parse(csvFields[2])),
      hosp: Number(csvFields[3]),
      rea: Number(csvFields[4]),
      rad: Number(csvFields[5]),
      dc: Number(csvFields[6]),
    } as CsvDto;
  }

  public static newDataDefault(
    departmentId: string, value: number): CasesData {

    return {
      id: DepartmentCode[departmentId],
      value: value,
    } as CasesData;
  }

  public static newDateInfo(
    hospObj: CasesData, reaObj: CasesData, radObj: CasesData,
    dcObj: CasesData, label?: string): FusionDto {

    return {
      hosp: hospObj,
      rea: reaObj,
      rad: radObj,
      dc: dcObj,
      label: label,
    } as FusionDto;
  }

  public static newMapDataSource(dataList: Array<CasesData>): DatasourceFusion {
    return {
      chart: ChartMock,
      colorrange: ColorrangeMock,
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
}
