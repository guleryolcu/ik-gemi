import { TestBed } from '@angular/core/testing';

import { Personnel } from './personnel.service';

describe('Personnel', () => {
  let service: Personnel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Personnel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
