import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComicReadersPageComponent } from './edit-comic-readers-page.component';

describe('EditComicReadersPageComponent', () => {
  let component: EditComicReadersPageComponent;
  let fixture: ComponentFixture<EditComicReadersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComicReadersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComicReadersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
