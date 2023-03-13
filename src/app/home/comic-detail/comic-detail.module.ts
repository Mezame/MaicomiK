import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicDetailComponent } from './comic-detail.component';

const routes: Routes = [{ path: '', component: ComicDetailComponent }];

@NgModule({
  declarations: [ComicDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ComicDetailModule {}
