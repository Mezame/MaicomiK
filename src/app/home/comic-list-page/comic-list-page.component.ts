import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';
import { ComicListFacadeService } from './comic-list-facade.service';

@Component({
  selector: 'app-comic-list-page',
  templateUrl: './comic-list-page.component.html',
  styleUrls: ['./comic-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListPageComponent implements OnInit {
  comics$: Observable<readonly Comic[]>;

  constructor(
    private comicListFacadeService: ComicListFacadeService,
    private router: Router
  ) {
    //this.comics$ = this.store.select(selectComics);
    this.comics$ = this.comicListFacadeService.getComics();
  }

  ngOnInit(): void {
    //this.store.dispatch(loadComicsAction());
  }

  getItemsAction(event: { action: string; data: Readonly<Comic> }) {
    let action: string;
    let comic: Readonly<Comic>;
    let comicUrlSegment: string;

    action = event.action;
    comic = event.data;
    comicUrlSegment = comic.metadata.urlSegment;

    if (action == 'incrementChapter') {
      this.incrementComicChapter(comic);
    }

    if (action == 'goToComicDetail') {
      this.goToComicDetail(comicUrlSegment);
    }
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
}
