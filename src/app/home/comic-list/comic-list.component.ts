import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Comic } from '@features/comics/comic';
import { Router } from '@angular/router';
import { selectComics } from '@features/comics/state/comics.selectors';
import { LoadComicsAction } from '@features/comics/state/comics.actions';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListComponent implements OnInit {
  comics$: Observable<readonly Comic[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.comics$ = this.store.select(selectComics);
  }

  ngOnInit(): void {
    this.store.dispatch(LoadComicsAction());
  }

  goToComic(event: { action: string; data: unknown }) {
    const comicUrlSegment = event.data;

    this.router.navigate(['/home/comics', comicUrlSegment]);
  }
}
