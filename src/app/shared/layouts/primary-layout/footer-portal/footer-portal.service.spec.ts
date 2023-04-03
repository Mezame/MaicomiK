import { TestBed } from '@angular/core/testing';

import { FooterPortalService } from './footer-portal.service';

describe('FooterPortalService', () => {
  let service: FooterPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
