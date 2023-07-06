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
        data: { layout: 'primaryLayout' },
      },
      {
        path: 'comics/add-comic',
        loadChildren: () =>
          import('./add-comic-page/add-comic-page.module').then(
            (m) => m.ComicAddPageModule
          ),
        data: { layout: 'fullModalLayout' },
      },
      {
        path: 'comics/:comicUrlSegment',
        loadChildren: () =>
          import('./comic-detail-page/comic-detail-page.module').then(
            (m) => m.ComicDetailPageModule
          ),
        data: { layout: 'primaryLayout' },
      },
      {
        path: 'comics/:comicUrlSegment/edit',
        loadChildren: () =>
          import('./edit-comic-page/edit-comic-page.module').then(
            (m) => m.EditComicPageModule
          ),
        data: { layout: 'fullModalLayout' },
      },
      {
        path: 'comics/:comicUrlSegment/add-readers',
        loadChildren: () =>
          import('./add-comic-readers-page/add-comic-readers-page.module').then(
            (m) => m.AddComicReadersPageModule
          ),
        data: { layout: 'fullModalLayout' },
      },
      {
        path: 'comics/:comicUrlSegment/readers/edit',
        loadChildren: () =>
          import(
            './edit-comic-readers-page/edit-comic-readers-page.module'
          ).then((m) => m.EditComicReadersPageModule),
        data: { layout: 'fullModalLayout' },
      },
      {
        path: 'comics/:comicUrlSegment/add-notes',
        loadChildren: () =>
          import('./add-comic-notes-page/add-comic-notes-page.module').then(
            (m) => m.AddComicNotesPageModule
          ),
        data: { layout: 'fullModalLayout' },
      },
      {
        path: 'comics/:comicUrlSegment/notes/edit',
        loadChildren: () =>
          import('./edit-comic-notes-page/edit-comic-notes-page.module').then(
            (m) => m.EditComicNotesPageModule
          ),
        data: { layout: 'fullModalLayout' },
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
