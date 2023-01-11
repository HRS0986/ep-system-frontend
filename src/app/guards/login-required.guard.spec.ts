import { TestBed } from '@angular/core/testing';

import { LoginRequiredGuard } from './login-required.guard';

describe('LoginRequiredGuard', () => {
  let guard: LoginRequiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginRequiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
