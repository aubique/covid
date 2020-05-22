import { CasesData } from '@app/models/cases-data';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { DepartmentCode } from '@shared/constants/code/department-code';
import { FactoryHelper } from '@shared/util/factory-helper';


export class MapperHelper {

  public static toCsvDto(csvFields: string[]): CsvDto {
    const department = csvFields[0].replace(/^"|"$/g, '');
    const gender = Number(csvFields[1]);
    const date = new Date(Date.parse(csvFields[2]));
    const hosp = Number(csvFields[3]);
    const rea = Number(csvFields[4]);
    const rad = Number(csvFields[5]);
    const dc = Number(csvFields[6]);

    return FactoryHelper.newCsvDto(department, gender, date, hosp, rea, rad, dc);
  }

  public static modCsvDto(csv: CsvDto, multiplier: number,
                          newDepartment?: string): CsvDto {
    const department = (newDepartment) ? newDepartment : csv.department;
    const gender = csv.gender;
    const date = csv.date;
    const hosp = ~~(csv.hosp * multiplier);
    const rea = ~~(csv.rea * multiplier);
    const rad = ~~(csv.rad * multiplier);
    const dc = ~~(csv.dc * multiplier);

    return FactoryHelper.newCsvDto(department, gender, date, hosp, rea, rad, dc);
  }

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

    return FactoryHelper.newDateInfo(id, hosp, rea, rad, dc);
  }

  public static modDateInfo(fusion: FusionDto,
                            multiplier: number, newId: string): FusionDto {
    // const id = (newId) ? newId : fusion.hosp.id;
    const id = newId;
    const hosp = ~~(fusion.hosp.value * multiplier);
    const rea = ~~(fusion.rea.value * multiplier);
    const rad = ~~(fusion.rad.value * multiplier);
    const dc = ~~(fusion.dc.value * multiplier);

    console.log('MOD DATE INFO TRIGGER');
    console.log(id);

    return FactoryHelper.newDateInfo(id, hosp, rea, rad, dc);
  }

  public static toDateList(typeInfo: TypeInfoEnum,
                           fusionList: Array<FusionDto>): Array<CasesData> {
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

  //Deprecated
  public static modifyList(oldList: Array<FusionDto>): Array<FusionDto> {
    const rhoneCode = '69';
    const lyonCode = '69M';
    const rhoneDepartmentCode = DepartmentCode[rhoneCode];
    const newList = new Array<FusionDto>();

    for (let el of oldList) {
      let fusionDto = el;

      if (rhoneDepartmentCode === el.hosp.id) {
        const newLyonDto = MapperHelper.modDateInfo(el, 0.6, lyonCode);
        newList.push(newLyonDto);

        console.log('Trigger RHONE/LYON');
        console.log(newLyonDto);

        fusionDto = MapperHelper.modDateInfo(el, 0.3, rhoneCode);
        console.log(fusionDto);
      }
      newList.push(fusionDto);
    }

    return newList;
  }
}
