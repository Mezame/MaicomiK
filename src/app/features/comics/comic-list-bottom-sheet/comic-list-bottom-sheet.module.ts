import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

import { ComicListBottomSheetComponent } from './comic-list-bottom-sheet.component';

@NgModule({
  declarations: [ComicListBottomSheetComponent],
  imports: [CommonModule, MatBottomSheetModule, MatListModule],
  exports: [ComicListBottomSheetComponent],
})
export class ComicListBottomSheetModule {}
