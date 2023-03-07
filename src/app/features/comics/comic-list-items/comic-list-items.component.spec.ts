import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicListItemsComponent } from './comic-list-items.component';

describe('ComicListItemsComponent', () => {
  let component: ComicListItemsComponent;
  let fixture: ComponentFixture<ComicListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicListItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComicListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
