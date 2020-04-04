import { Injectable, OnInit } from '@angular/core';
import { InfoDto } from '@app/models/InfoDto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService implements OnInit {

  public informationList$ = new BehaviorSubject<Array<InfoDto>>(null);
  public lastDate: string;
  public date$ = new BehaviorSubject<Date>(new Date());

  constructor() {
  }

  ngOnInit(): void {
    // this.informationList$ = new BehaviorSubject<Array<InfoDto>>(null);
  }
}
