import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComicReadersFormModule } from '@features/comics/add-edit-comic-readers-form/add-edit-comic-readers-form.module';
import { FooterPortalModule } from '@shared/layouts/footer-portal/footer-portal.module';
import { EditComicReadersPageComponent } from './edit-comic-readers-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditComicReadersPageComponent,
  },
];

@NgModule({
  declarations: [EditComicReadersPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AddEditComicReadersFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class EditComicReadersPageModule {}
