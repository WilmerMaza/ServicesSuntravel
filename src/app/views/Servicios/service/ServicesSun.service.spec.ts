/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicesSunService } from './ServicesSun.service';

describe('Service: ServicesSun', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicesSunService]
    });
  });

  it('should ...', inject([ServicesSunService], (service: ServicesSunService) => {
    expect(service).toBeTruthy();
  }));
});
