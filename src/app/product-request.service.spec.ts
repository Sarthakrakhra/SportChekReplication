import { TestBed } from '@angular/core/testing';

import { ProductRequestService } from './product-request.service';

describe('ProductRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductRequestService = TestBed.get(ProductRequestService);
    expect(service).toBeTruthy();
  });
});
