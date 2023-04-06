import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ComicReadersAddEditFormModule } from '@features/comics/comic-readers-add-edit-form/comic-readers-add-edit-form.module';
import { FooterPortalModule } from '@shared/layouts/primary-layout/footer-portal/footer-portal.module';
import { ComicReadersAddPageComponent } from './comic-readers-add-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComicReadersAddPageComponent,
  },
];

@NgModule({
  declarations: [ComicReadersAddPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComicReadersAddEditFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class ComicReadersAddPageModule {}
