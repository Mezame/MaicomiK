import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { ComicDetailBottomSheetComponent } from './comic-detail-bottom-sheet.component';

@NgModule({
  declarations: [ComicDetailBottomSheetComponent],
  imports: [CommonModule, RouterModule, MatBottomSheetModule, MatListModule],
  exports: [ComicDetailBottomSheetComponent],
})
export class ComicDetailBottomSheetModule {}
