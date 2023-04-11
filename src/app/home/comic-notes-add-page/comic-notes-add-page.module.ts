import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ComicNotesAddEditFormModule } from '@features/comics/comic-notes-add-edit-form/comic-notes-add-edit-form.module';
import { FooterPortalModule } from '@shared/layouts/primary-layout/footer-portal/footer-portal.module';
import { ComicNotesAddPageComponent } from './comic-notes-add-page.component';

const routes: Routes = [{ path: '', component: ComicNotesAddPageComponent }];

@NgModule({
  declarations: [ComicNotesAddPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComicNotesAddEditFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class ComicNotesAddPageModule {}
