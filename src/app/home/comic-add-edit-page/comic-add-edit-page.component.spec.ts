import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicAddEditPageComponent } from './comic-add-edit-page.component';

describe('ComicAddEditPageComponent', () => {
  let component: ComicAddEditPageComponent;
  let fixture: ComponentFixture<ComicAddEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicAddEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicAddEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
