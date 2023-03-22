import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { ComicDetailContentComponent } from './comic-detail-content.component';
import { TagModule } from '@shared/ui-components/tag/tag.module';

@NgModule({
  declarations: [ComicDetailContentComponent],
  imports: [
    CommonModule,
    TagModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
  ],
  exports: [ComicDetailContentComponent],
})
export class ComicDetailContentModule {}
