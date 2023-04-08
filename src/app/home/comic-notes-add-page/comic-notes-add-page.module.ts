import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ComicNotesAddPageComponent } from './comic-notes-add-page.component';

const routes: Routes = [{ path: '', component: ComicNotesAddPageComponent }];

@NgModule({
  declarations: [ComicNotesAddPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ComicNotesAddPageModule {}
