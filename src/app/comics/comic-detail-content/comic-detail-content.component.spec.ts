import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailContentComponent } from './comic-detail-content.component';

describe('ComicDetailContentComponent', () => {
  let component: ComicDetailContentComponent;
  let fixture: ComponentFixture<ComicDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicDetailContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
