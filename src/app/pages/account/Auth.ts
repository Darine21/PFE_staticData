import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AccountService } from "./account.service";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const expectedRole = route.data.role as string;
    return this.accountService.user$.pipe(
      map(user => {
        if (user && user.role === expectedRole) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      })
    );
  }
}
