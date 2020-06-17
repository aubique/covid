import { Component, OnDestroy, OnInit } from '@angular/core';

import { FacadeService } from '@app/services/facade.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'covid-ui';

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    // this.facade.initTypeFromLocalStorage();
    this.facade.setLanguage();
    this.facade.loadTranslate();
  }

  ngOnDestroy(): void {
    this.facade.unloadTranslate();
  }
}
