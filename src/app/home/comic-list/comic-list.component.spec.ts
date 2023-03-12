import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ComicListItemsModule } from '@features/comics/comic-list-items/comic-list-items.module';
import { ComicsService } from '@features/comics/comics.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';

import { ComicListComponent } from './comic-list.component';

describe('ComicListComponent', () => {
  let component: ComicListComponent;
  let fixture: ComponentFixture<ComicListComponent>;
  let comicsService: jasmine.SpyObj<ComicsService>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const comicsServiceSpy = jasmine.createSpyObj('comicsService', [
      'getComics',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PrimaryLayoutModule,
        ComicListItemsModule,
      ],
      declarations: [ComicListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: ComicsService, useValue: comicsServiceSpy },
      ],
    }).compileComponents();

    comicsService = TestBed.inject(
      ComicsService
    ) as jasmine.SpyObj<ComicsService>;

    fixture = TestBed.createComponent(ComicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
