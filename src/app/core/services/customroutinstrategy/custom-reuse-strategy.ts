import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  // Decide if route should be detached (cached)
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['reuse'] === true;
  }

  // Store the detached route
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    if (handle) {
      this.storedRoutes.set(route.routeConfig?.path ?? '', handle);
    }
  }

  // Decide if route should be reattached
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return this.storedRoutes.has(route.routeConfig?.path ?? '');
  }

  // Retrieve stored route
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRoutes.get(route.routeConfig?.path ?? '') ?? null;
  }

  // Decide if route should be reused
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
