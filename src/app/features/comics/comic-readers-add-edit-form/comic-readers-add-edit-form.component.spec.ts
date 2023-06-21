import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicReadersAddEditFormComponent } from './comic-readers-add-edit-form.component';

describe('ComicReadersAddEditFormComponent', () => {
  let component: ComicReadersAddEditFormComponent;
  let fixture: ComponentFixture<ComicReadersAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicReadersAddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicReadersAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
