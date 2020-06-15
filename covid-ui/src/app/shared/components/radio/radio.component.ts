import { Component, OnInit } from '@angular/core';

import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FacadeService } from '@app/services/facade.service';
import { faDizzy, faHospitalUser, faProcedures, faSmile } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {

  readonly HOSP_BTN = {text: 'Hospitalized', enum: TypeInfoEnum.Hosp};
  readonly REA_BTN = {text: 'Intensive Care', enum: TypeInfoEnum.Rea};
  readonly RAD_BTN = {text: 'Recovered', enum: TypeInfoEnum.Rad};
  readonly DC_BTN = {text: 'Deaths', enum: TypeInfoEnum.Dc};

  typeInfoState: BehaviorSubject<TypeInfoEnum>;

  faHospitalUser = faHospitalUser;
  faDizzy = faDizzy;
  faSmile = faSmile;
  faProcedures = faProcedures;

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.typeInfoState = this.facade.typeInfo$;
  }

  onClick(type: TypeInfoEnum): void {
    this.facade.switchMap(type);
  }
}
