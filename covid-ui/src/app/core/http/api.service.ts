import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public static readonly OPEN_COVID_GIT = 'https://raw.githubusercontent.com/opencovid19-fr/data/aa247f092c6cf27fced4b589f9b409292cac0456/data-sources/sante-publique-france/covid_hospit.csv';
  public static readonly DIRECT_DATA_GOUV = 'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';
  public static readonly ROUTE53_DATA_GOUV = 'http://data.covid19map.fr';

  constructor(private http: HttpClient) {
  }

  public fetchOpencovidCsv(): Observable<string> {
    return this.http.get(ApiService.DIRECT_DATA_GOUV, {responseType: 'text'});
  }
}
