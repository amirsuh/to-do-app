import { TestBed } from '@angular/core/testing';

import { CustomReuseStrategy } from './custom-reuse-strategy';

describe('CustomReuseStrategy', () => {
  let service: CustomReuseStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomReuseStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
