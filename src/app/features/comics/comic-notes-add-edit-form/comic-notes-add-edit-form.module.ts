import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComicNotesAddEditFormComponent } from './comic-notes-add-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [ComicNotesAddEditFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [ComicNotesAddEditFormComponent],
})
export class ComicNotesAddEditFormModule {}
