import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicAddPageComponent } from './comic-add-page.component';

describe('ComicAddPageComponent', () => {
  let component: ComicAddPageComponent;
  let fixture: ComponentFixture<ComicAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
