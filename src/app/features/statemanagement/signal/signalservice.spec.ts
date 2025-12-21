import { TestBed } from '@angular/core/testing';

import { Signalservice } from './signalservice';

describe('Signalservice', () => {
  let service: Signalservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Signalservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
