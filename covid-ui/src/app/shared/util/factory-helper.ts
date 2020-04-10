import { CsvDto } from '@app/models/csv-dto';
import { CasesData } from '@app/models/cases-data';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { FusionDto } from '@app/models/fusion-dto';
import { ChartMock } from '@shared/constants/data/chart.mock';
import { ColorrangeMock } from '@shared/constants/data/colorrange.mock';
import { DepartmentCode } from '@shared/constants/maps/department-code';


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

  // public static newMapDataSource(fusionList: FusionDto[]): DatasourceFusion {
  //   const dataList = new Array<CasesData>();
  //   fusionList.forEach(dto => dataList.push(dto.hosp));
  //
  //   return {
  //     chart: ChartMock,
  //     colorrange: ColorrangeMock,
  //     data: dataList,
  //   } as DatasourceFusion;
  // }

  public static newMapDataSource(dataList: Array<CasesData>): DatasourceFusion {
    return {
      chart: ChartMock,
      colorrange: ColorrangeMock,
      data: dataList,
    } as DatasourceFusion;
  }
}