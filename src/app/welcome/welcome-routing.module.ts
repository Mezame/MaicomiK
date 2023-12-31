import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./sign-in-page/sign-in-page.module').then(
            (m) => m.SignInPageModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./sign-up-page/sign-up-page.module').then(
            (m) => m.SignUpPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
