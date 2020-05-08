import { Component, OnInit } from '@angular/core';

import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FacadeService } from '@app/services/facade.service';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import {
  faAmbulance,
  faDizzy,
  faGlobeEurope,
  faHospitalUser,
  faProcedures,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  readonly HOSP_BTN = {text: 'Hospitalized', enum: TypeInfoEnum.Hosp};
  readonly REA_BTN = {text: 'Intensive Care', enum: TypeInfoEnum.Rea};
  readonly RAD_BTN = {text: 'Recovered', enum: TypeInfoEnum.Rad};
  readonly DC_BTN = {text: 'Deaths', enum: TypeInfoEnum.Dc};

  typeInfoState: BehaviorSubject<TypeInfoEnum>;

  faGlobalEurope = faGlobeEurope;
  faAmbulance = faAmbulance;
  faHospitalUser = faHospitalUser;
  faDizzy = faDizzy;
  faSmile = faSmile;
  faProcedures = faProcedures;
  faGithub = faGithub;

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.typeInfoState = this.facade.typeInfo$;
  }

  onClick(type: TypeInfoEnum): void {
    this.facade.saveTypeToLocalStorage(type);
  }
}
