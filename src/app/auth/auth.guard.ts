import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";
@Injectable({providedIn:"root"})
export class AuthGuard implements CanActivate{

  constructor(private authservice:AuthService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authservice.user.pipe(take(1), map(user=>{
       const isAuth=!!user
      if(isAuth){
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }

}
