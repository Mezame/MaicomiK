import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TagModule } from '@shared/ui-components/tag/tag.module';
import { ComicListItemsComponent } from './comic-list-items.component';

@NgModule({
  declarations: [ComicListItemsComponent],
  imports: [
    CommonModule,
    TagModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [ComicListItemsComponent],
})
export class ComicListItemsModule {}
