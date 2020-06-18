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

  public languagePack = LanguagesDefault;
  public static readonly DEFAULT_LANGUAGE = {
    name: 'English',
    lang: 'en',
  } as Language;

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

    console.log('DefaultLang:', this.translate.getDefaultLang());
    console.log(langPack.indexOf(browserLang));//TODO remove stdout
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
    const startLabel = this.translate.instant('Fusion.Low');
    const endLabel = this.translate.instant('Fusion.High');

    return FactoryHelper.newColorrange(maxValue, startLabel, endLabel);
  }

  public proceedChart(date: string): ChartFusion {
    const caption = this.translate.instant('Fusion.Caption', {date: date});
    return FactoryHelper.newChart(caption);
  }
}
