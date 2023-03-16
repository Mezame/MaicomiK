import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicListBottomSheetComponent } from './comic-list-bottom-sheet.component';

describe('ComicListBottomSheetComponent', () => {
  let component: ComicListBottomSheetComponent;
  let fixture: ComponentFixture<ComicListBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicListBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicListBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
