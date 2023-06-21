import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicNotesAddEditFormComponent } from './comic-notes-add-edit-form.component';

describe('ComicNotesAddEditFormComponent', () => {
  let component: ComicNotesAddEditFormComponent;
  let fixture: ComponentFixture<ComicNotesAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicNotesAddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicNotesAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
