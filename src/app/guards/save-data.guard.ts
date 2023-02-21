import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SaveDataGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Promise<boolean> | boolean {
    return component.canDeactivate();
  }

}
