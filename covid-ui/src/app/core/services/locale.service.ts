import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { ChartFusion } from '@app/models/fusion/chart-fusion';
import { ColorrangeFusion } from '@app/models/fusion/colorrange-fusion';
import { Language } from '@app/models/misc/language';
import { StoreService } from '@app/services/store.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesDefault } from '@shared/constants/default/languages.default';
import { FactoryHelper } from '@shared/util/factory-helper';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LocaleService {

  private static readonly FORMAT_DATE = 'longDate';
  public static readonly DEFAULT_LANGUAGE = {
    name: 'English',
    lang: 'en',
  } as Language;
  private static readonly FUSION_LOW = 'Fusion.Low';
  private static readonly FUSION_HIGH = 'Fusion.High';
  private static readonly FUSION_CAPTION = 'Fusion.Caption';

  public languagePack = LanguagesDefault;

  constructor(
    private translate: TranslateService,
    private store: StoreService,
  ) {
  }

  switchLang(language: Language): void {
    this.translate.use(language.lang);
    this.store.language$.next(language);
  }

  public loadBrowserLanguage(): void {
    const browserLang = this.translate.getBrowserLang();
    let defaultLanguage = LocaleService.DEFAULT_LANGUAGE;
    const langPack = this.languagePack.map(l => l.lang);

    if (langPack.indexOf(browserLang) > -1)
      defaultLanguage = this.languagePack
        .filter(l => l.lang === browserLang)
        .pop() as Language;

    this.translate.addLangs(langPack);
    this.translate.setDefaultLang(defaultLanguage.lang);
    this.store.language$.next(defaultLanguage);
  }

  public subscribeTranslationLoading(): Array<Subscription> {
    const subscriptions = new Array<Subscription>();
    const loadingMsg = 'Translation has been loaded:';

    this.languagePack
      .map(language => language.lang)
      .forEach(lang => {
        const subscription = this.translate.getTranslation(lang)
          .subscribe(lang => console.log(loadingMsg, lang));

        subscriptions.push(subscription);
      });

    return subscriptions;
  }

  public proceedColorrange(maxValue: number): ColorrangeFusion {
    const startLabel = this.translate.instant(LocaleService.FUSION_LOW);
    const endLabel = this.translate.instant(LocaleService.FUSION_HIGH);

    return FactoryHelper.newColorrange(maxValue, startLabel, endLabel);
  }

  public proceedChart(date: Date, language: Language): ChartFusion {
    const dateFormatted = formatDate(date, LocaleService.FORMAT_DATE, language.lang);
    const caption = this.translate
      .instant(LocaleService.FUSION_CAPTION, {date: dateFormatted});

    return FactoryHelper.newChart(caption);
  }
}
