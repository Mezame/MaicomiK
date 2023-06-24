import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComicPageComponent } from './add-comic-page.component';

describe('AddComicPageComponent', () => {
  let component: AddComicPageComponent;
  let fixture: ComponentFixture<AddComicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComicPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddComicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
