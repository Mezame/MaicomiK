import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailPageComponent } from './comic-detail-page.component';

describe('ComicDetailComponent', () => {
  let component: ComicDetailPageComponent;
  let fixture: ComponentFixture<ComicDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
