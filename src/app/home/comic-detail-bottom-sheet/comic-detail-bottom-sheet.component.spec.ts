import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailBottomSheetComponent } from './comic-detail-bottom-sheet.component';

describe('ComicDetailBottomSheetComponent', () => {
  let component: ComicDetailBottomSheetComponent;
  let fixture: ComponentFixture<ComicDetailBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicDetailBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicDetailBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
