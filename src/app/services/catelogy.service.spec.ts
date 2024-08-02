import { TestBed } from '@angular/core/testing';

import { CatelogyService } from './catelogy.service';

describe('CatelogyService', () => {
  let service: CatelogyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatelogyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
