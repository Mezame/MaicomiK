import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicListItemsComponent } from './comic-list-items.component';



@NgModule({
  declarations: [
    ComicListItemsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComicListItemsComponent
  ]
})
export class ComicListItemsModule { }
