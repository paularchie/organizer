import { TestBed } from '@angular/core/testing';
import { UsersFacade } from './users-facade.service';


describe('UsersFacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', async () => {
    const service: UsersFacade = TestBed.get(UsersFacade);
    expect(service).toBeTruthy();
  });
});
