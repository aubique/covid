import { Component, OnInit } from '@angular/core';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {

  faGlobalEurope = faGlobeEurope;

  constructor() {
  }

  ngOnInit(): void {
  }
}
