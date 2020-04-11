import { CasesData } from '@app/models/cases-data';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { FactoryHelper } from '@shared/util/factory-helper';


export class MapperHelper {

  public static toDataInfoList(csvList: Array<CsvDto>): Array<FusionDto> {
    const dataList = new Array<FusionDto>();
    csvList.forEach(csv =>
      dataList.push(MapperHelper.toDateInfo(csv)));

    return dataList;
  }

  public static toDateInfo(csv: CsvDto): FusionDto {
    const id = csv.department;
    const hosp = csv.hosp;
    const rea = csv.rea;
    const rad = csv.rad;
    const dc = csv.dc;

    const hospObj = FactoryHelper.newDataDefault(id, hosp);
    const reaObj = FactoryHelper.newDataDefault(id, rea);
    const radObj = FactoryHelper.newDataDefault(id, rad);
    const dcObj = FactoryHelper.newDataDefault(id, dc);

    return FactoryHelper.newDateInfo(hospObj, reaObj, radObj, dcObj);
  }

  public static toDateList(
    typeInfo: TypeInfoEnum, fusionList: Array<FusionDto>): Array<CasesData> {
    const dataList = new Array<CasesData>();

    fusionList.forEach(dto => {
      const dataTypeChosen = this.determineDataType(typeInfo, dto);
      dataList.push(dataTypeChosen);
    });

    return dataList;
  }

  private static determineDataType(typeInfo: TypeInfoEnum, dto: FusionDto): CasesData {
    switch (typeInfo) {
      case TypeInfoEnum.Hosp:
        return dto.hosp;
      case TypeInfoEnum.Rea:
        return dto.rea;
      case TypeInfoEnum.Rad:
        return dto.rad;
      case TypeInfoEnum.Dc:
        return dto.dc;
      default:
        return dto.hosp;
    }
  }
}
