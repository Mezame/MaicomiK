import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  Comic,
  GoToComicDetailEvent,
  IncrementComicChapterEvent,
} from '@features/comics/models';
import { EventBus, EventBusReceiver } from '@shared/models';
import { Observable } from 'rxjs';
import { ComicListFacadeService } from './comic-list-facade.service';

@Component({
  selector: 'app-comic-list-page',
  templateUrl: './comic-list-page.component.html',
  styleUrls: ['./comic-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListPageComponent
  implements EventBusReceiver, OnInit, OnDestroy
{
  comics$!: Observable<readonly Comic[]>;

  constructor(
    private comicListFacadeService: ComicListFacadeService,
    private router: Router
  ) {
    /*
     *this.comics$ = this.store.select(selectComics);
     */
  }

  ngOnInit(): void {
    this.setInitialValues();
    /*
     *this.store.dispatch(loadComicsAction());
     */
  }

  ngOnDestroy(): void {
    this.comicListFacadeService.clearApiState();
  }

  onEvent(event: EventBus): void {
    let eventName: string;

    eventName = event.name;

    if (eventName == 'incrementComicChapter') {
      this.tryToIncrementComicChapter(event);
    }

    if (eventName == 'goToComicDetail') {
      this.tryToGoToComicDetail(event);
    }
  }

  tryToIncrementComicChapter(event: IncrementComicChapterEvent): void {
    let comic: Readonly<Comic>;

    comic = event.data;

    this.incrementComicChapter(comic);
  }

  tryToGoToComicDetail(event: GoToComicDetailEvent): void {
    let comic: Readonly<Comic>;
    let comicUrlSegment: string;

    comic = event.data;
    comicUrlSegment = comic.metadata.urlSegment;

    this.goToComicDetail(comicUrlSegment);
  }

  incrementComicChapter(comic: Readonly<Comic>) {
    let updatedChapter: number;
    let comicFields: Partial<Comic>;

    updatedChapter = comic.chapter + 1;
    comicFields = { chapter: updatedChapter };

    this.comicListFacadeService.incrementComicChapter(comic, comicFields);
  }

  goToComicDetail(comicUrlSegment: string) {
    this.router.navigate(['/home', 'comics', comicUrlSegment]);
  }

  private setInitialValues(): void {
    this.comics$ = this.comicListFacadeService.getComics();
  }
}
