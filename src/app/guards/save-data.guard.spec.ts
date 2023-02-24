import { TestBed } from '@angular/core/testing';

import { SaveDataGuard } from './save-data.guard';

describe('SaveDataGuard', () => {
  let guard: SaveDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SaveDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
