import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicNotesEditPageComponent } from './comic-notes-edit-page.component';

describe('ComicNotesEditPageComponent', () => {
  let component: ComicNotesEditPageComponent;
  let fixture: ComponentFixture<ComicNotesEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicNotesEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicNotesEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
