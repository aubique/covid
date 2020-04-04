import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public fetchOpencovidCsv(): Observable<string> {
    const rawCsv = 'https://raw.githubusercontent.com/opencovid19-fr/data/master/data-sources/sante-publique-france/covid_hospit.csv';
    return this.http.get(rawCsv, {responseType: 'text'});
  }
}
