import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicAddEditFormComponent } from './comic-add-edit-form.component';

describe('ComicAddEditFormComponent', () => {
  let component: ComicAddEditFormComponent;
  let fixture: ComponentFixture<ComicAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicAddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
