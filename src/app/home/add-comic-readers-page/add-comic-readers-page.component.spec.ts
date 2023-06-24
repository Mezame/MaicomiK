import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComicReadersPageComponent } from './add-comic-readers-page.component';

describe('AddComicReadersPageComponent', () => {
  let component: AddComicReadersPageComponent;
  let fixture: ComponentFixture<AddComicReadersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComicReadersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddComicReadersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
