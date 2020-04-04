import { InfoDto } from '@app/models/InfoDto';

export class HelperFactory {

  public static createInformationDto(csvFields: string[]): InfoDto {
    return {
      department: csvFields[0].replace(/^"|"$/g, ''),
      gender: Number(csvFields[1]),
      date: new Date(Date.parse(csvFields[2])),
      hosp: Number(csvFields[3]),
      rea: Number(csvFields[4]),
      rad: Number(csvFields[5]),
      dc: Number(csvFields[6]),
    } as InfoDto;
  }
}
