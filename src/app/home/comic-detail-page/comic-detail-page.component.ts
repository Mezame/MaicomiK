import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/comic';
import { ComicsStoreService } from '@features/comics/comics-store.service';
import {
  deleteComicAction,
  incrementComicChapterAction,
} from '@features/comics/state/comics.actions';
import { selectComic } from '@features/comics/state/comics.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-comic-detail-page',
  templateUrl: './comic-detail-page.component.html',
  styleUrls: ['./comic-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicDetailPageComponent {
  comic$: Observable<Readonly<Comic>>;

  @ViewChild('bottomSheet') bottomSheet!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private _bottomSheet: MatBottomSheet,
    private comicsStoreService: ComicsStoreService,
    private router: Router
  ) {
    const comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.store.select(selectComic(comicUrlSegment)).pipe(
      map((comic) => {
        if (!comic) {
          this.store.dispatch({ type: '[Comic Detail Page] Load Comics' });

          return {} as Readonly<Comic>;
        }

        return comic;
      })
    );
  }

  getContentAction(event: { action: string; data: Readonly<Comic> }) {
    let action: string;
    let comic: Readonly<Comic>;

    action = event.action;
    comic = event.data;

    if (action == 'incrementChapter') {
      this.incrementComicChapter(comic);
    }

    if (action == 'openBottomSheet') {
      this.openBottomSheet();
    }
  }

  incrementComicChapter(comic: Readonly<Comic>) {
    let updatedChapter: number;
    let comicFields: Partial<Comic>;

    updatedChapter = comic.chapter + 1;
    comicFields = { chapter: updatedChapter };

    this.store.dispatch(
      incrementComicChapterAction({ comic, fields: comicFields })
    );
  }

  deleteComic(comicId: string) {
    this.closeBottomSheet();

    this.store.dispatch(deleteComicAction({ id: comicId }));

    this.comicsStoreService.getApiState().subscribe((apiState) => {
      if (
        apiState?.operation == 'deleteComic' &&
        apiState.status == 'success'
      ) {
        this.navigateToComicListPage();
      }
    });
  }

  deleteComicReaders(comic: Readonly<Comic>) {
    let comicFields: Partial<Comic>;

    this.closeBottomSheet();
    comicFields = { readers: null };

    this.store.dispatch({
      type: '[Comic Detail Page] Delete Comic Readers',
      comic,
      fields: comicFields,
    });
  }

  deleteComicNotes(comic: Readonly<Comic>) {
    let comicFields: Partial<Comic>;

    this.closeBottomSheet();
    comicFields = { notes: null };

    this.store.dispatch({
      type: '[Comic Detail Page] Delete Comic Notes',
      comic,
      fields: comicFields,
    });
  }

  openBottomSheet() {
    this._bottomSheet.open(this.bottomSheet);
  }

  closeBottomSheet() {
    this._bottomSheet.dismiss();
  }

  private navigateToComicListPage() {
    this.router.navigate(['/home', 'comics']);
  }
}
