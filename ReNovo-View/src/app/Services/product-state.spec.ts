import { TestBed } from '@angular/core/testing';

import { ProductState } from './product-state';

describe('ProductState', () => {
  let service: ProductState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
