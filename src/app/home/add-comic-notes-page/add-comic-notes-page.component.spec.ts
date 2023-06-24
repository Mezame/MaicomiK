import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComicNotesPageComponent } from './add-comic-notes-page.component';

describe('AddComicNotesPageComponent', () => {
  let component: AddComicNotesPageComponent;
  let fixture: ComponentFixture<AddComicNotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComicNotesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComicNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
