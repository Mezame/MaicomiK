import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComicListItemsComponent } from './comic-list-items.component';

@NgModule({
  declarations: [ComicListItemsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ComicListItemsComponent],
})
export class ComicListItemsModule {}
