import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicNotesAddPageComponent } from './comic-notes-add-page.component';

describe('ComicNotesAddPageComponent', () => {
  let component: ComicNotesAddPageComponent;
  let fixture: ComponentFixture<ComicNotesAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicNotesAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicNotesAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
