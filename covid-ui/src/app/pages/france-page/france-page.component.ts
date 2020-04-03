import { Component, OnInit } from '@angular/core';
import { MapData } from 'src/app/core/mock/MapData';

const colorrange = {
  'minvalue': '0',
  'startlabel': 'Low',
  'endlabel': 'High',
  'code': 'e44a00',
  'gradient': '1',
  'color': [{'maxvalue': '2500', 'code': 'f8bd19'}, {'maxvalue': '5000', 'code': '6baa01'}],
};

@Component({
  selector: 'app-france-page',
  templateUrl: './france-page.component.html',
  styleUrls: ['./france-page.component.scss'],
})
export class FrancePageComponent implements OnInit {

  dataSource: Object;
  title = 'France map';

  constructor() {
    this.dataSource = {
      'chart': {
        'animation': '0',
        'showbevel': '0',
        'usehovercolor': '1',
        'showlegend': '1',
        'legendposition': 'BOTTOM',
        'legendborderalpha': '0',
        'legendbordercolor': 'ffffff',
        'legendallowdrag': '0',
        'legendshadow': '0',
        'caption': 'Website Visits for the month of March 2018',
        'connectorcolor': '000000',
        'fillalpha': '80',
        'hovercolor': 'CCCCCC',
        'theme': 'fusion',
      },
      'colorrange': colorrange,
      'data': MapData,
    };
  }

  ngOnInit(): void {
  }
}
