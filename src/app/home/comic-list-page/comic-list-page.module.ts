import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicListItemsModule } from '@features/comics/comic-list-items/comic-list-items.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicListPageComponent } from './comic-list-page.component';

const routes: Routes = [{ path: '', component: ComicListPageComponent }];

@NgModule({
  declarations: [ComicListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ComicListItemsModule,
  ],
})
export class ComicListPageModule {}
