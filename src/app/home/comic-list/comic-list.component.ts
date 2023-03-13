import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComicsService } from '@features/comics/comics.service';
import { selectComics } from '@features/comics/state/comics.selectors';
import { ComicsApiActions } from '@features/comics/state/comics.actions';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListComponent implements OnInit {
  comics$ = this.store.select(selectComics);

  constructor(private comicsService: ComicsService, private store: Store) {}

  ngOnInit(): void {
    const id = 'j1HeoLSPX6EgdhcvjoS6';

    this.comicsService
      .getComics(id)
      .subscribe((comics) =>
        this.store.dispatch(ComicsApiActions.retrievedComicList({ comics }))
      );
  }
}
