import { TestBed } from '@angular/core/testing';

import { ProgressBarservice } from './progress-barservice';

describe('ProgressBarservice', () => {
  let service: ProgressBarservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressBarservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
