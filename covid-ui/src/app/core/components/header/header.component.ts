import { Component, OnInit } from '@angular/core';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  faGlobalEurope = faGlobeEurope;
  faGithub = faGithub;
  faFileAlt = faFileAlt;

  constructor() {
  }

  ngOnInit(): void {
  }
}
