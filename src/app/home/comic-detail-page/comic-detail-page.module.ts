import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicDetailContentModule } from '@features/comics/comic-detail-content/comic-detail-content.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicDetailBottomSheetModule } from '../comic-detail-bottom-sheet/comic-detail-bottom-sheet.module';
import { ComicDetailPageComponent } from './comic-detail-page.component';

const routes: Routes = [{ path: '', component: ComicDetailPageComponent }];

@NgModule({
  declarations: [ComicDetailPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ComicDetailContentModule,
    ComicDetailBottomSheetModule
  ],
})
export class ComicDetailPageModule {}
