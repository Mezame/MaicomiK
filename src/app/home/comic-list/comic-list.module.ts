import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimaryLayoutModule } from 'src/app/shared/layouts/primary-layout/primary-layout.module';
import { ComicListComponent } from './comic-list.component';

const routes: Routes = [{ path: '', component: ComicListComponent }];

@NgModule({
  declarations: [ComicListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PrimaryLayoutModule],
})
export class ComicListModule {}
