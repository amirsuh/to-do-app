import { TestBed } from '@angular/core/testing';

import { Medicinservice } from './medicinservice';

describe('Medicinservice', () => {
  let service: Medicinservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medicinservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
