import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formDeactivateGuard } from './form-deactivate-guard';

describe('formDeactivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
