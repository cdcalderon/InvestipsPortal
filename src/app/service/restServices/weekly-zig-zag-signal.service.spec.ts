import { TestBed } from '@angular/core/testing';

import { WeeklyZigZagSignalService } from './weekly-zig-zag-signal.service';

describe('WeeklyZigZagSignalService', () => {
  let service: WeeklyZigZagSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyZigZagSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
