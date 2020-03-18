import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { MainService } from '../main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data:any;
  submitted = false;
  
  profileForm = this.fb.group({
    f_name: ['',Validators.required],
    l_name: ['',Validators.required],
    Email : ['',[Validators.required,Validators.email]],
    password :['',[Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder,private router:Router,private Service:MainService,private toast:ToastrService) { }

  get f_name() {return this.profileForm.get('f_name')}

  get l_name() {return this.profileForm.get('l_name')}
  
  get Email() {return this.profileForm.get('Email')}
  
  get password() {return this.profileForm.get('password')}

  onSubmit() {
    this.submitted = true;
      if(this.profileForm.invalid){
        this.profileForm.get('f_name').markAsTouched();
        this.profileForm.get('l_name').markAsTouched();
        this.profileForm.get('Email').markAsTouched();
        this.profileForm.get('password').markAsTouched();
      }else{     
        this.Service.postuser({
          f_name:this.profileForm.value.f_name,
          l_name:this.profileForm.value.l_name,
          email:this.profileForm.value.Email,
          password:this.profileForm.value.password
        }).subscribe((res)=>{
          this.showtoasterdf(res);
        })     
      }
}
showtoasterdf(res){
  if(res.success){
    this.toast.success(res.success,res.message);
    this.router.navigateByUrl('/login')
  }else{        
    this.toast.warning(res.success,res.message);
  }
  }
 ngOnInit(): void {
   
  }

}
