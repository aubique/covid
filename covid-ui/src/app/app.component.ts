import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@app/services/facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'covid-ui';

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
    this.facade.initTypeFromLocalStorage();
  }
}
