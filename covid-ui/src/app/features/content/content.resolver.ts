import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';

import { FacadeService } from '@app/services/facade.service';
import { FactoryHelper } from '@shared/util/factory-helper';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ContentResolver implements Resolve<null> {

  constructor(private facade: FacadeService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<null> | Promise<null> | null {
    const routeParam = route.params['type'];

    console.log('param =', routeParam);

    if (ContentResolver.isParamValid(routeParam)) {
      const typeInfo = this.facade.forwardResolve(routeParam);
      this.facade.saveTypeToLocalStorage(typeInfo);
      return;
    }
    this.facade.initTypeFromLocalStorage();

    return;
  }

  private static isParamValid(param: string): boolean {
    const typeEnum = FactoryHelper.newTypeInfoEnum(param);

    return typeEnum !== TypeInfoEnum.Default;
  }
}
