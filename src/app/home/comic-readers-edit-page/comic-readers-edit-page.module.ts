import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ComicReadersAddEditFormModule } from '@features/comics/comic-readers-add-edit-form/comic-readers-add-edit-form.module';
import { FooterPortalModule } from '@shared/layouts/primary-layout/footer-portal/footer-portal.module';
import { ComicReadersEditPageComponent } from './comic-readers-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComicReadersEditPageComponent,
  },
];

@NgModule({
  declarations: [ComicReadersEditPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComicReadersAddEditFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class ComicReadersEditPageModule {}