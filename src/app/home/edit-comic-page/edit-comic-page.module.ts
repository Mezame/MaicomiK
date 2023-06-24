import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComicFormModule } from '@features/comics/add-edit-comic-form/add-edit-comic-form.module';
import { FooterPortalModule } from '@shared/layouts/footer-portal/footer-portal.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { EditComicPageComponent } from './edit-comic-page.component';

const routes: Routes = [
  {
    path: '',
    component: EditComicPageComponent,
  },
];

@NgModule({
  declarations: [EditComicPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    AddEditComicFormModule,
    MatButtonModule,
    FooterPortalModule,
  ],
})
export class EditComicPageModule {}
