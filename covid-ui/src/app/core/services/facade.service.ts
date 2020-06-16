import { Injectable, OnInit } from '@angular/core';

import { ApiService } from '@app/http/api.service';
import { CsvDto } from '@app/models/csv-dto';
import { TypeInfoEnum } from '@app/models/enums/type-info.enum';
import { FusionDto } from '@app/models/fusion-dto';
import { DatasourceFusion } from '@app/models/fusion/datasource-fusion';
import { Language } from '@app/models/misc/language';
import { LangService } from '@app/services/lang.service';
import { LoaderService } from '@app/services/loader.service';
import { OpencovidService } from '@app/services/opencovid.service';
import { StoreService } from '@app/services/store.service';

import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FacadeService implements OnInit {

  private fusionSubscription: Subscription;
  private typeSubscription: Subscription;
  private translateSubscriptions: Array<Subscription>;

  constructor(
    private store: StoreService,
    private api: ApiService,
    private opencovid: OpencovidService,
    private loader: LoaderService,
    private lang: LangService,
  ) {
  }

  ngOnInit(): void {
  }

  get csvList$(): BehaviorSubject<Array<CsvDto>> {
    return this.store.csvList$;
  }

  get fusionList$(): BehaviorSubject<Array<FusionDto>> {
    return this.store.fusionList$;
  }

  get mapDatasource$(): BehaviorSubject<DatasourceFusion> {
    return this.store.mapDatasource$;
  }

  get languageList(): Array<Language> {
    return this.lang.languagePack;
  }

  get typeInfo$(): BehaviorSubject<TypeInfoEnum> {
    return this.store.typeInfo$;
  }

  public loadCsvFromOpencovid(): void {
    this.opencovid.handleCsvFile();
    this.opencovid.batchCsv();
  }

  public loadMap(): void {
    this.fusionSubscription = this.loader.triggerByFusionList();
    this.typeSubscription = this.loader.triggerByTypeInfo();
  }

  public unloadMap(): void {
    this.fusionSubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }

  public initTypeFromLocalStorage(): void {
    this.loader.loadTypeInfo();
  }

  public forwardResolve(typeInfoStr: string): TypeInfoEnum {
    return this.loader.forwardResolve(typeInfoStr);
  }

  public saveTypeToLocalStorage(typeInfoEnum: TypeInfoEnum): void {
    this.loader.saveTypeInfo(typeInfoEnum);
  }

  public switchMap(typeInfo: TypeInfoEnum): void {
    this.loader.navigateTo(typeInfo);
  }

  public setLanguage(): void {
    this.lang.loadBrowserLanguage();
  }

  public switchLanguage(language: Language): void {
    this.lang.switchLang(language.lang);
  }

  public unloadTranslate(): void {
    this.translateSubscriptions.forEach(s => s.unsubscribe());
  }

  public loadTranslate(): void {
    this.translateSubscriptions = this.lang.subscribeOnTranslate();
  }
}
