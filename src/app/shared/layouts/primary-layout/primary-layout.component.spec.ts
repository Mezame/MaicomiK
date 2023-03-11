import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { PrimaryLayoutComponent } from './primary-layout.component';
import { PrimaryLayoutModule } from './primary-layout.module';

describe('PrimaryLayoutComponent', () => {
  let component: PrimaryLayoutComponent;
  let fixture: ComponentFixture<PrimaryLayoutComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PrimaryLayoutModule],
      declarations: [PrimaryLayoutComponent],
      providers: [{ provide: ActivatedRoute, useValue: routeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
