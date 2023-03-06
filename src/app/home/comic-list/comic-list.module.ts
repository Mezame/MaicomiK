import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicListComponent } from './comic-list.component';

const routes: Routes = [{ path: '', component: ComicListComponent }];

@NgModule({
  declarations: [ComicListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ComicListModule {}
