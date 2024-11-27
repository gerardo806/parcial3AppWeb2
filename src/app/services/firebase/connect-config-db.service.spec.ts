import { TestBed } from '@angular/core/testing';

import { ConnectConfigDbService } from './connect-config-db.service';

describe('ConnectConfigDbService', () => {
  let service: ConnectConfigDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectConfigDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
