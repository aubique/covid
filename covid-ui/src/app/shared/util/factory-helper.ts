import { CsvDto } from '@app/models/CsvDto';
import { DataFusion } from '@app/models/DataFusion';
import { DataSourceFusion } from '@app/models/fusion/DataSourceFusion';
import { FusionDto } from '@app/models/FusionDto';
import { ChartMock } from '@shared/constants/data/ChartMock';
import { ColorrangeMock } from '@shared/constants/data/ColorrangeMock';
import { DepartmentCodeRecord } from '@shared/constants/maps/DepartmentCodeRecord';


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
    departmentId: string, value: number): DataFusion {

    return {
      id: DepartmentCodeRecord[departmentId],
      value: value,
    } as DataFusion;
  }

  public static newDateInfo(
    hospObj: DataFusion, reaObj: DataFusion, radObj: DataFusion,
    dcObj: DataFusion, label?: string): FusionDto {

    return {
      hosp: hospObj,
      rea: reaObj,
      rad: radObj,
      dc: dcObj,
      label: label,
    } as FusionDto;
  }

  public static newMapDataSource(fusionList: FusionDto[]): DataSourceFusion {
    const dataDefaultList = new Array<DataFusion>();
    fusionList.forEach(dto => dataDefaultList.push(dto.hosp));

    return {
      chart: ChartMock,
      colorrange: ColorrangeMock,
      data: dataDefaultList,
    } as DataSourceFusion;
  }
}
