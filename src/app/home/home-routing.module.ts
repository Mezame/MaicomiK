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
          import('./add-comic-page/add-comic-page.module').then(
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
          import('./edit-comic-page/edit-comic-page.module').then(
            (m) => m.EditComicPageModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment/add-readers',
        loadChildren: () =>
          import('./comic-readers-add-page/comic-readers-add-page.module').then(
            (m) => m.ComicReadersAddPageModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment/readers/edit',
        loadChildren: () =>
          import(
            './comic-readers-edit-page/comic-readers-edit-page.module'
          ).then((m) => m.ComicReadersEditPageModule),
      },
      {
        path: 'comics/:comicUrlSegment/add-notes',
        loadChildren: () =>
          import('./add-comic-notes-page/add-comic-notes-page.module').then(
            (m) => m.AddComicNotesPageModule
          ),
      },
      {
        path: 'comics/:comicUrlSegment/notes/edit',
        loadChildren: () =>
          import('./comic-notes-edit-page/comic-notes-edit-page.module').then(
            (m) => m.ComicNotesEditPageModule
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
