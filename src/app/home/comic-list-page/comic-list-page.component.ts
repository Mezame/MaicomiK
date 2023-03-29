import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Comic } from '@features/comics/comic';
import { Router } from '@angular/router';
import { selectComics } from '@features/comics/state/comics.selectors';
import { loadComicsAction } from '@features/comics/state/comics.actions';

@Component({
  selector: 'app-comic-list-page',
  templateUrl: './comic-list-page.component.html',
  styleUrls: ['./comic-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListPageComponent implements OnInit {
  comics$: Observable<readonly Comic[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.comics$ = this.store.select(selectComics);
  }

  ngOnInit(): void {
    this.store.dispatch(loadComicsAction());
  }

  goToComic(event: { action: string; data: unknown }) {
    const comicUrlSegment = event.data;

    this.router.navigate(['/home/comics', comicUrlSegment]);
  }
}
