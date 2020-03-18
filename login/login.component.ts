import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import {Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  submitted = false;

  profileForm = this.fb.group({
    Email : ['',Validators.required],
    password :['',Validators.required],
  });
  constructor(public fb : FormBuilder, private router:Router,private Service:MainService,private toast:ToastrService,private cookieService: CookieService) { }

get Email() {return this.profileForm.get('Email')}

get password() {return this.profileForm.get('password')}

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.get('Email').markAsTouched();
      this.profileForm.get('password').markAsTouched();
    }else{
      this.Service.userlogin({
        email:this.profileForm.value.Email,
        password:this.profileForm.value.password
      }).subscribe((res)=>{
        localStorage.setItem('email',this.profileForm.value.Email);
        localStorage.setItem('password',this.profileForm.value.password);
        this.showtoasterdf(res);
        this.cookieService.set('id', res.data._id);  
      })
    }
  }
  showtoasterdf(res){
    if(res.success){
      this.toast.success(res.success,res.message);
      this.router.navigateByUrl('/dashboard')
    }else{        
      this.toast.warning(res.success,res.message);
    }
  }

  frgpass(){
    if(this.Email.invalid){
     this.toast.info('Please Enter Email');
    }else{
      this.toast.success('Password are sent')
    }
  }

  ngOnInit(): void {
  }

}
