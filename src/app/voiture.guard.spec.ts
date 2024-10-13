import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { VoitureGuard } from './voiture.guard';

describe('VoitureGuard', () => {
  let guard: VoitureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard=TestBed.inject(VoitureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
