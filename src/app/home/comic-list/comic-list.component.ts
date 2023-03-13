import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Comic } from '@features/comics/comic';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListComponent implements OnInit {
  comics$: Observable<readonly Comic[]>;

  constructor(private store: Store<{ comics: readonly Comic[] }>) {
    this.comics$ = this.store.select((state) => state.comics);
  }

  ngOnInit(): void {
    this.store.dispatch({ type: '[Comic List Page] Load Comics' });
  }
}
