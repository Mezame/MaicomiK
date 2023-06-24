import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '@features/comics/models';
import { Observable } from 'rxjs';
import { ComicDetailFacadeService } from './comic-detail-facade.service';

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
    private _bottomSheet: MatBottomSheet,
    private comicDetailFacadeService: ComicDetailFacadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const comicUrlSegment = this.route.snapshot?.params['comicUrlSegment'];

    this.comic$ = this.comicDetailFacadeService.getComic(comicUrlSegment);
  }

  onContentAction(event: { action: string; data: Readonly<Comic> }): void {
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

  incrementComicChapter(comic: Readonly<Comic>): void {
    let updatedChapter: number;
    let comicFields: Partial<Comic>;

    updatedChapter = comic.chapter + 1;
    comicFields = { chapter: updatedChapter };

    this.comicDetailFacadeService.incrementComicChapter(comic, comicFields);
  }

  deleteComic(comicId: string): void {
    this.closeBottomSheet();

    this.comicDetailFacadeService.deleteComic(comicId);

    this.comicDetailFacadeService.getApiState().subscribe((apiState) => {
      if (
        apiState?.operation == 'deleteComic' &&
        apiState.status == 'success'
      ) {
        this.navigateToComicListPage();
      }
    });
  }

  deleteComicReaders(comic: Readonly<Comic>): void {
    let comicFields: Partial<Comic>;

    this.closeBottomSheet();
    comicFields = { readers: null };

    this.comicDetailFacadeService.deleteComicReaders(comic, comicFields);
  }

  deleteComicNotes(comic: Readonly<Comic>): void {
    let comicFields: Partial<Comic>;

    this.closeBottomSheet();
    comicFields = { notes: null };

    this.comicDetailFacadeService.deleteComicNotes(comic, comicFields);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(this.bottomSheet);
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  private navigateToComicListPage(): void {
    this.router.navigate(['/home', 'comics']).catch((error) => error);
  }
}
