import { Component, OnInit } from '@angular/core';
import { CovidService } from '@app/services/covid.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit {

  constructor(
    private service: CovidService,
  ) {
  }

  ngOnInit(): void {
  }
}
