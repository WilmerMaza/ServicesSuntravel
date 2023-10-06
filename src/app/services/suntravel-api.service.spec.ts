import { TestBed } from '@angular/core/testing';

import { SuntravelApiService } from './suntravel-api.service';

describe('MicoviApiService', () => {
  let service: SuntravelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuntravelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
