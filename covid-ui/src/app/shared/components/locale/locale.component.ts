import { Component, OnDestroy, OnInit } from '@angular/core';
import { Language } from '@app/models/misc/language';

import { FacadeService } from '@app/services/facade.service';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-locale',
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss'],
})
export class LocaleComponent implements OnInit, OnDestroy {

  faLanguage = faLanguage;

  constructor(
    public facade: FacadeService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  switchLang(language: Language): void {
    this.facade.switchLanguage(language);
  }
}
