import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comics',
        loadChildren: () =>
          import('./comic-list-page/comic-list-page.module').then(
            (m) => m.ComicListPageModule
          ),
      },
      {
        path: 'comics/add-comic',
        loadChildren: () =>
          import('./comic-add-page/comic-add-page.module').then(
            (m) => m.ComicAddPageModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment',
        loadChildren: () =>
          import('./comic-detail-page/comic-detail-page.module').then(
            (m) => m.ComicDetailPageModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment/edit',
        loadChildren: () =>
          import('./comic-add-edit-page/comic-add-edit-page.module').then(
            (m) => m.ComicAddEditPageModule
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
