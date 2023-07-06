import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ComicListItemsModule } from '@features/comics/comic-list-items/comic-list-items.module';
import { ComicDataService } from '@features/comics/services/comic-data.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicListPageComponent } from './comic-list-page.component';

describe('ComicListPageComponent', () => {
  let component: ComicListPageComponent;
  let fixture: ComponentFixture<ComicListPageComponent>;
  let comicDataService: jasmine.SpyObj<ComicDataService>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const comicsDataServiceSpy = jasmine.createSpyObj('comicDataService', [
      'getComics',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PrimaryLayoutModule,
        ComicListItemsModule,
      ],
      declarations: [ComicListPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: ComicDataService, useValue: comicsDataServiceSpy },
      ],
    }).compileComponents();

    comicDataService = TestBed.inject(
      ComicDataService
    ) as jasmine.SpyObj<ComicDataService>;

    fixture = TestBed.createComponent(ComicListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
