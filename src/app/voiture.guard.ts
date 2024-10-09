import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree  } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

export const voitureGuard: CanActivateFn = (route, state) => {

  return true;
};
