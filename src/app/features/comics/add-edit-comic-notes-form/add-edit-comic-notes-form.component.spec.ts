import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditComicNotesFormComponent } from './add-edit-comic-notes-form.component';

describe('AddEditComicNotesFormComponent', () => {
  let component: AddEditComicNotesFormComponent;
  let fixture: ComponentFixture<AddEditComicNotesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditComicNotesFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditComicNotesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
