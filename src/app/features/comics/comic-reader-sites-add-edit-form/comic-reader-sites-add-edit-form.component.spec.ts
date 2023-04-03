import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicReaderSitesAddEditFormComponent } from './comic-reader-sites-add-edit-form.component';

describe('ComicReaderSitesAddEditFormComponent', () => {
  let component: ComicReaderSitesAddEditFormComponent;
  let fixture: ComponentFixture<ComicReaderSitesAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicReaderSitesAddEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicReaderSitesAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
