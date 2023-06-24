import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComicNotesPageComponent } from './edit-comic-notes-page.component';

describe('EditComicNotesPageComponent', () => {
  let component: EditComicNotesPageComponent;
  let fixture: ComponentFixture<EditComicNotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComicNotesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComicNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
