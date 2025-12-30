import { TestBed } from '@angular/core/testing';

import { Singleton } from './singleton';

describe('Singleton', () => {
  let service: Singleton;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Singleton);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
