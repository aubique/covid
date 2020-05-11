export class CovidHelper {

  public static readonly FIELD_SEPARATOR = ';';

  public static isOverallInformation(lineFields: string[]): boolean {
    return (this.isGenderZero(lineFields[1]));
  }

  public static isGenderZero(gender: string): boolean {
    return (gender == '0');
  }

  public static isToday(date: string): boolean {
    const today = new Date().toISOString().slice(0, 10);
    const input = new Date(Date.parse(date)).toISOString().slice(0, 10);
    return (today == input);
  }

  public static extractDate(line: string): Date {
    const date = line.split(CovidHelper.FIELD_SEPARATOR)[2];
    return new Date(Date.parse(date));
  }

  public static convertDate(dateObj: Date): string {
    return new Date(dateObj).toISOString().slice(0, 10);
  }

  public static getStandardDate(dateTxt: string): string {
    return this.convertDate(new Date(Date.parse(dateTxt)));
  }
}
