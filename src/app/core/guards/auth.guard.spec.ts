import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should allow access to "/memorama" route when there is a username in localStorage', () => {
    const spyRouter = spyOn(router, 'parseUrl');
    localStorage.setItem('username', 'Test User');
    expect(guard.canActivate(null, { url: '/memorama' })).toBe(true);
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('should allow access to "/" route when there is no username in localStorage', () => {
    const spyRouter = spyOn(router, 'parseUrl');
    localStorage.removeItem('username');
    expect(guard.canActivate(null, { url: '/' })).toBe(true);
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('should redirect to "/memorama" when there is a username in localStorage and accessing "/" route', () => {
    const spyRouter = spyOn(router, 'parseUrl');
    localStorage.setItem('username', 'Test User');
    expect(guard.canActivate(null, { url: '/' })).toEqual(jasmine.any(UrlTree));
    expect(spyRouter).toHaveBeenCalledWith('/memorama');
  });

  it('should redirect to "/" when there is no username in localStorage and accessing "/memorama" route', () => {
    const spyRouter = spyOn(router, 'parseUrl');
    localStorage.removeItem('username');
    expect(guard.canActivate(null, { url: '/memorama' })).toEqual(jasmine.any(UrlTree));
    expect(spyRouter).toHaveBeenCalledWith('/');
  });
});
