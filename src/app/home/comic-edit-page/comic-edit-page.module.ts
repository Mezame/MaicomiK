import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ComicAddEditFormModule } from 'src/app/comics/comic-add-edit-form/comic-add-edit-form.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicEditPageComponent } from './comic-edit-page.component';
import { FooterPortalModule } from '@shared/layouts/footer-portal/footer-portal.module';

const routes: Routes = [
  {
    path: '',
    component: ComicEditPageComponent,
  },
];

@NgModule({
  declarations: [ComicEditPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ComicAddEditFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class ComicEditPageModule {}
