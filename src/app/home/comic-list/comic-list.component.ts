import { ChangeDetectionStrategy, Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Comic } from '@features/comics/comic';
import { ComicsService } from '@features/comics/comics.service';
import { Observable } from 'rxjs';
import { comicsMock } from 'src/testing/comics.mock';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListComponent {
  comics$!: Observable<readonly Comic[]>;

  constructor(private comicsService: ComicsService) {
    const id = 'j1HeoLSPX6EgdhcvjoS6';

    this.comics$ = this.comicsService.getComics(id);
  }
}
