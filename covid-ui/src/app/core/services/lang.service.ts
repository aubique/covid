import { Injectable } from '@angular/core';

import { StoreService } from '@app/services/store.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageListMock } from '@shared/constants/data/language-list.mock';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class LangService {

  public languagePack = LanguageListMock;
  private static readonly DEFAULT_LANG = 'en';

  constructor(
    private translate: TranslateService,
    private store: StoreService,
  ) {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  public loadBrowserLanguage(): void {
    const browserLang = this.translate.getBrowserLang();

    if (this.languagePack.map(l => l.lang).indexOf(browserLang) > -1) {
      this.translate.setDefaultLang(browserLang);

      console.log('Set language of the browser:', browserLang);
    } else {
      this.translate.setDefaultLang(LangService.DEFAULT_LANG);

      console.log('Set the default locale:', LangService.DEFAULT_LANG);
    }

    console.log(this.languagePack.map(l => l.lang).indexOf(browserLang));
  }

  public subscribeOnTranslate(): Array<Subscription> {
    const subscriptions = new Array<Subscription>();

    subscriptions.push(this.translate.stream('Language.English').subscribe(res => {
      console.log('English:', res);
    }));
    subscriptions.push(this.translate.stream('Language.French').subscribe(res => {
      console.log('French:', res);
    }));
    subscriptions.push(this.translate.stream('Language.Russian').subscribe(res => {
      console.log('Russian:', res);
    }));

    return subscriptions;
  }
}
