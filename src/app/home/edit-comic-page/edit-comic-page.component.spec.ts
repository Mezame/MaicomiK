import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicEditPageComponent } from './edit-comic-page.component';

describe('ComicEditPageComponent', () => {
  let component: ComicEditPageComponent;
  let fixture: ComponentFixture<ComicEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
