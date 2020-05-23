import { Component, OnInit } from '@angular/core';

import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FacadeService } from '@app/services/facade.service';
import { StoreService } from '@app/services/store.service';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';

import { faDizzy, faGlobeEurope, faHospitalUser, faProcedures, faSmile } from '@fortawesome/free-solid-svg-icons';


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

  typeInfoState: any;
  typeInfo: TypeInfoEnum;

  faGlobalEurope = faGlobeEurope;
  faHospitalUser = faHospitalUser;
  faDizzy = faDizzy;
  faSmile = faSmile;
  faProcedures = faProcedures;
  faGithub = faGithub;
  faFileAlt = faFileAlt;

  constructor(
    private facade: FacadeService,
    private store: StoreService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.store.typeInfo$.getValue());
    this.typeInfoState = this.store.typeInfo$;
    this.store.typeInfo$.subscribe(t => {
      this.typeInfo = t;
      console.log(this.typeInfo);
    });

    // this.typeInfoState = this.facade.typeInfo$.pipe(
    //   filter(t => t === TypeInfoEnum.Hosp),
    //   tap(t => {
    //     this.typeInfo = t;
    //     console.log('Trigger onInit HEADER');
    //     console.log(this.typeInfo);
    //   }),
    // );
  }

  onClick(type: TypeInfoEnum): void {
    this.facade.switchMap(type);
  }
}
