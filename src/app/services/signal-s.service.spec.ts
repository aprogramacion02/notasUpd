import { TestBed } from '@angular/core/testing';

import { SignalSService } from './signal-s.service';

describe('SignalSService', () => {
  let service: SignalSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
