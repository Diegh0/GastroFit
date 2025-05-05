import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, from, mergeMap } from 'rxjs';
import { reload } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.user$.pipe(
      // transformamos en observable asincrónico
      map(async user => {
        if (user) {
          await reload(user); // asegura datos actualizados
          if (user.emailVerified) {
            return true;
          } else {
            return this.router.createUrlTree(['/verificacion']);
          }
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      }),
      // aplanamos la promesa devuelta por map
      // (porque el map devuelve una Promise<boolean | UrlTree>)
      // así que usamos `from` para convertirlo en observable
      // y `mergeMap` para encadenar
      mergeMap(result => from(result))
    );
  }
}
