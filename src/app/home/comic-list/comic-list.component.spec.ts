import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { ComicListItemsModule } from '@features/comics/comic-list-items/comic-list-items.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary-layout/primary-layout.module';

import { ComicListComponent } from './comic-list.component';

describe('ComicListComponent', () => {
  let component: ComicListComponent;
  let fixture: ComponentFixture<ComicListComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        PrimaryLayoutModule,
        ComicListItemsModule,
      ],
      declarations: [ComicListComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ComicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
