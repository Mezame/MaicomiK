import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ComicAddEditFormModule } from '@features/comics/add-edit-comic-form/comic-add-edit-form.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicAddPageComponent } from './comic-add-page.component';
import { FooterPortalModule } from '@shared/layouts/footer-portal/footer-portal.module';

const routes: Routes = [
  {
    path: '',
    component: ComicAddPageComponent,
  },
];

@NgModule({
  declarations: [ComicAddPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ComicAddEditFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class ComicAddPageModule {}
