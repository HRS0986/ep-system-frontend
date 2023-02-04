import { TestBed } from '@angular/core/testing';

import { PreventLoginGuard } from './prevent-login.guard';

describe('PreventLoginGuard', () => {
  let guard: PreventLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
