import { Injectable, OnInit } from '@angular/core';

import { ApiService } from '@app/http/api.service';
import { StoreService } from '@app/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService implements OnInit {

  constructor(
    private store: StoreService,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
  }
}
