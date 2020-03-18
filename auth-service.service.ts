import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService implements CanActivate {
  constructor( private router:Router, private toast:ToastrService) { }
  canActivate() {
    if(localStorage.getItem('email')){
      return true;
    }
    else{
      this.toast.info('Please enter Email')
      this.router.navigateByUrl('');
      return false
    }

    
  }
}
