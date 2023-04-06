import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicReadersAddPageComponent } from './comic-readers-add-page.component';

describe('ComicReadersAddPageComponent', () => {
  let component: ComicReadersAddPageComponent;
  let fixture: ComponentFixture<ComicReadersAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicReadersAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicReadersAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
