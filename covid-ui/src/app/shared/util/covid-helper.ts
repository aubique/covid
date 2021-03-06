import { strptime } from 'strtime';


export class CovidHelper {

  public static readonly FIELD_SEPARATOR = ';';
  public static readonly RHONE = {code: '69', multiplier: 0.33};
  public static readonly LYON = {code: '69M', multiplier: 0.66};

  public static isGenderZero(gender: string): boolean {
    return (gender == "0");
  }

  public static isToday(date: string): boolean {
    const today = new Date().toISOString().slice(0, 10);
    const input = new Date(Date.parse(date)).toISOString().slice(0, 10);
    return (today == input);
  }

  public static extractDate(line: string): Date {
    const date = line.split(CovidHelper.FIELD_SEPARATOR)[2];
    // console.log(date);
    // console.log(new Date(strptime(date, '%d/%m/%Y')));
    return this.parseDate(date);
  }

  public static convertDate(dateObj: Date): string {
    // console.log(dateObj);
    // console.log(new Date(dateObj).toISOString().slice(0, 10));
    return new Date(dateObj).toISOString().slice(0, 10);
  }

  public static getStandardDate(dateStr: string): string {
    // return this.convertDate(new Date(Date.parse(dateStr)));
    return this.convertDate(this.parseDate(dateStr));
  }

  public static parseDate(dateStr: string): Date {
    let dateObj = new Date(Date.parse(dateStr));
    //console.log("Date:");
    //console.log(dateObj);

    try {
      dateObj.toISOString();
      //console.log("ISO String:");
      //console.log(dateObj);
    } catch (e) {
      dateObj = strptime(dateStr, '%d/%m/%Y');
      // dateObj = strptime(dateStr, '%Y-%m-%d');
      console.log("Custom Date:");
      console.log(dateObj);
    }

    return dateObj;
  }
}
