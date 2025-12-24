import { TestBed } from '@angular/core/testing';

import { Paginationservice } from './paginationservice';

describe('Paginationservice', () => {
  let service: Paginationservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Paginationservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
