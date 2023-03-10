import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TagModule } from '@shared/common-ui/tag/tag.module';
import { ComicListItemsComponent } from './comic-list-items.component';

@NgModule({
  declarations: [ComicListItemsComponent],
  imports: [CommonModule, TagModule, MatButtonModule, MatIconModule],
  exports: [ComicListItemsComponent],
})
export class ComicListItemsModule {}
