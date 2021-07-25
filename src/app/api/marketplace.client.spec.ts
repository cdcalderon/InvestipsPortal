import { TestBed } from '@angular/core/testing';

import { MarketplaceClient } from './marketplace.client';

describe('MarketplaceClient', () => {
  let service: MarketplaceClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarketplaceClient]
    });
    service = TestBed.inject(MarketplaceClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
