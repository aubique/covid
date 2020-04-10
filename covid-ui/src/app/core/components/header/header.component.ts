import { Component, OnInit } from '@angular/core';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FacadeService } from '@app/services/facade.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  readonly HOSP_ENUM = TypeInfoEnum.Hosp;
  readonly REA_ENUM = TypeInfoEnum.Rea;
  readonly RED_ENUM = TypeInfoEnum.Rad;
  readonly DC_ENUM = TypeInfoEnum.Dc;
  typeInfoState: BehaviorSubject<TypeInfoEnum>;

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.typeInfoState = this.facade.typeInfo$;
  }

  onClick(type: TypeInfoEnum): void {
    this.facade.saveTypeToLocalStorage(type);
  }
}
