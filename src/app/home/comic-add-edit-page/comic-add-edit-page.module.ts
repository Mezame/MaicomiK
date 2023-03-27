import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ComicAddEditFormModule } from '@features/comics/comic-add-edit-form/comic-add-edit-form.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicAddEditPageComponent } from './comic-add-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: ComicAddEditPageComponent,
  },
];

@NgModule({
  declarations: [ComicAddEditPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ComicAddEditFormModule,
    MatButtonModule,
  ],
})
export class ComicAddEditPageModule {}
