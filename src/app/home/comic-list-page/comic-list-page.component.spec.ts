import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ComicListItemsModule } from '@features/comics/comic-list-items/comic-list-items.module';
import { ComicsDataService } from '@features/comics/services/comics-data.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';
import { ComicListPageComponent } from './comic-list-page.component';

describe('ComicListPageComponent', () => {
  let component: ComicListPageComponent;
  let fixture: ComponentFixture<ComicListPageComponent>;
  let comicsDataService: jasmine.SpyObj<ComicsDataService>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const comicsDataServiceSpy = jasmine.createSpyObj('comicsDataService', [
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
        { provide: ComicsDataService, useValue: comicsDataServiceSpy },
      ],
    }).compileComponents();

    comicsDataService = TestBed.inject(
      ComicsDataService
    ) as jasmine.SpyObj<ComicsDataService>;

    fixture = TestBed.createComponent(ComicListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
