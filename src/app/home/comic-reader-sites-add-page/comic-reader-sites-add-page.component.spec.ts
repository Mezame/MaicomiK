import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicReaderSitesAddPageComponent } from './comic-reader-sites-add-page.component';

describe('ComicReaderSitesAddPageComponent', () => {
  let component: ComicReaderSitesAddPageComponent;
  let fixture: ComponentFixture<ComicReaderSitesAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicReaderSitesAddPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicReaderSitesAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
