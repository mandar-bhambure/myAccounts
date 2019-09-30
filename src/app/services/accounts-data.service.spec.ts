import { TestBed } from '@angular/core/testing';

import { AccountsDataService } from './accounts-data.service';

describe('AccountsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountsDataService = TestBed.get(AccountsDataService);
    expect(service).toBeTruthy();
  });
});
