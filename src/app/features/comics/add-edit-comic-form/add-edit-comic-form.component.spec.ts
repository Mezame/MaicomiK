import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditComicFormComponent } from './add-edit-comic-form.component';

describe('AddEditComicFormComponent', () => {
  let component: AddEditComicFormComponent;
  let fixture: ComponentFixture<AddEditComicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditComicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditComicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
