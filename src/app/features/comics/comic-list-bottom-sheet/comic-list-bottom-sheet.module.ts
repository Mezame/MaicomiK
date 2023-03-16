import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ComicListBottomSheetComponent } from './comic-list-bottom-sheet.component';

@NgModule({
  declarations: [ComicListBottomSheetComponent],
  imports: [CommonModule, MatBottomSheetModule],
  exports: [ComicListBottomSheetComponent],
})
export class ComicListBottomSheetModule {}
