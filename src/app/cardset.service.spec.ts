import { TestBed } from '@angular/core/testing';

import { CardsetService } from './cardset.service';

describe('CardsetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardsetService = TestBed.get(CardsetService);
    expect(service).toBeTruthy();
  });
});
