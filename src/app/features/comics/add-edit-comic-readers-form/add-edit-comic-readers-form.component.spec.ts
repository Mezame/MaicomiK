import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditComicReadersFormComponent } from './add-edit-comic-readers-form.component';

describe('AddEditComicReadersFormComponent', () => {
  let component: AddEditComicReadersFormComponent;
  let fixture: ComponentFixture<AddEditComicReadersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditComicReadersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditComicReadersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
