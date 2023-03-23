import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  imports: [CommonModule, RouterModule.forChild(routes), PrimaryLayoutModule],
})
export class ComicAddEditPageModule {}
