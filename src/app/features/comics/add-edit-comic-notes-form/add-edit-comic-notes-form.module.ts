import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComicNotesFormComponent } from './add-edit-comic-notes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AddEditComicNotesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [AddEditComicNotesFormComponent],
})
export class AddEditComicNotesFormModule {}
