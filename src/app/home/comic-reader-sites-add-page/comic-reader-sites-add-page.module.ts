import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { ComicReaderSitesAddPageComponent } from './comic-reader-sites-add-page.component';
import { ComicReaderSitesAddEditFormModule } from '@features/comics/comic-reader-sites-add-edit-form/comic-reader-sites-add-edit-form.module';

const routes: Routes = [
  {
    path: '',
    component: ComicReaderSitesAddPageComponent,
  },
];

@NgModule({
  declarations: [ComicReaderSitesAddPageComponent],
  imports: [CommonModule, ComicReaderSitesAddEditFormModule],
})
export class ComicReaderSitesAddPageModule {}
