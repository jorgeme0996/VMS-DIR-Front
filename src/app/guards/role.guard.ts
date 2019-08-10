import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad  {

  constructor(private authService: AuthService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    return this.authService.validaRole();
  }
}