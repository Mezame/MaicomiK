import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Comic } from '@features/comics/comic';
import { comicsMock } from 'src/testing/comics.mock';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListComponent {
  comics!: Comic[];

  constructor() {
    this.comics = comicsMock;
  }
}
