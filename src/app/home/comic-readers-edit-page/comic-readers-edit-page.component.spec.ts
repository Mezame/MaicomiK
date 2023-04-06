import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicReadersEditPageComponent } from './comic-readers-edit-page.component';

describe('ComicReadersEditPageComponent', () => {
  let component: ComicReadersEditPageComponent;
  let fixture: ComponentFixture<ComicReadersEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicReadersEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicReadersEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
