import { TestBed } from '@angular/core/testing';

import { ConfigDbService } from './config-db.service';

describe('ConfigDbService', () => {
  let service: ConfigDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
