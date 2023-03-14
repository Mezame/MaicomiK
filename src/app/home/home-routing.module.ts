import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comics',
        loadChildren: () =>
          import('./comic-list/comic-list.module').then(
            (m) => m.ComicListModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment',
        loadChildren: () =>
          import('./comic-detail/comic-detail.module').then(
            (m) => m.ComicDetailModule
          ),
      },
      {
        path: '',
        redirectTo: 'comics',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
