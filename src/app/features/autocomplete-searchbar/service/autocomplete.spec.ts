import { TestBed } from '@angular/core/testing';

import { AutocompleteService } from './autocomplete';

describe('Autocomplete', () => {
  let service: AutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
