import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@app/services/facade.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {

  constructor(private facade: FacadeService) {
  }

  ngOnInit(): void {
  }
}
