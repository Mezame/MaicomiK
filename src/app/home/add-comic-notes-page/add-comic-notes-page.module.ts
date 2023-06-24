import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComicNotesFormModule } from '@features/comics/add-edit-comic-notes-form/add-edit-comic-notes-form.module';
import { FooterPortalModule } from '@shared/layouts/footer-portal/footer-portal.module';
import { AddComicNotesPageComponent } from './add-comic-notes-page.component';

const routes: Routes = [{ path: '', component: AddComicNotesPageComponent }];

@NgModule({
  declarations: [AddComicNotesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AddEditComicNotesFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class AddComicNotesPageModule {}
