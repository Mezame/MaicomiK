import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Comic } from '@features/comics/comic';
import { ComicsService } from '@features/comics/comics.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComicListComponent implements OnInit {
  comics$!: Observable<readonly Comic[]>;

  constructor(private comicsService: ComicsService) {}

  ngOnInit(): void {
    const id = 'j1HeoLSPX6EgdhcvjoS6';

    this.comics$ = this.comicsService.getComics(id);
  }
}
