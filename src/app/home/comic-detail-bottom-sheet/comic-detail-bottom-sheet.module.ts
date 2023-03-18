import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

import { ComicDetailBottomSheetComponent } from './comic-detail-bottom-sheet.component';

@NgModule({
  declarations: [ComicDetailBottomSheetComponent],
  imports: [CommonModule, MatBottomSheetModule, MatListModule],
  exports: [ComicDetailBottomSheetComponent],
})
export class ComicDetailBottomSheetModule {}
