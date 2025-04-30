import { TestBed } from '@angular/core/testing';

import { IaHistoryService } from './ia-history.service';

describe('IaHistoryService', () => {
  let service: IaHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IaHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
