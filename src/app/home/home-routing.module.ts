import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comic-list',
        loadChildren: () =>
          import('./comic-list/comic-list.module').then(
            (m) => m.ComicListModule
          ),
      },
      {
        path: '',
        redirectTo: 'comic-list',
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
