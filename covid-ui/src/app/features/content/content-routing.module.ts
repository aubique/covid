import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from '@modules/content/content.component';
import { ContentResolver } from '@modules/content/content.resolver';


const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    resolve: {
      project: ContentResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {
}
