import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullModalLayoutComponent } from './full-modal-layout.component';

describe('FullModalLayoutComponent', () => {
  let component: FullModalLayoutComponent;
  let fixture: ComponentFixture<FullModalLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullModalLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullModalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
