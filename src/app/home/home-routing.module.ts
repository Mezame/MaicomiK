import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
          import('./comic-edit-page/comic-edit-page.module').then(
            (m) => m.ComicEditPageModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment/readers/add',
        loadChildren: () =>
          import(
            './comic-readers-add-page/comic-readers-add-page.module'
          ).then((m) => m.ComicReadersAddPageModule),
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
