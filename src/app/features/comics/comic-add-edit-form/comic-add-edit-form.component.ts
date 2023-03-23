import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-comic-add-edit-form',
  templateUrl: './comic-add-edit-form.component.html',
  styleUrls: ['./comic-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicAddEditFormComponent {}
