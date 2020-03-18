import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {Validators} from '@angular/forms'
import { MainService } from '../../main.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  data:any;
  submitted = false;
  param:any;
  myapp:any;
  f_namess:any;
  l_namess:any;
  emailss:any;
  passwords:any;
  productData:any;

  profileForm = this.fb.group({
    f_name: ['',Validators.required],
    l_name: ['',Validators.required],
    Email : ['',[Validators.required,Validators.email]],
    password :['',[Validators.required, Validators.minLength(8)]],
  });
  profileForms = this.fb.group({
    f_names: ['',Validators.required],
    l_names: ['',Validators.required],
    Emails : ['',[Validators.required,Validators.email]]
  });
  constructor(private fb: FormBuilder,private router:Router,private Service:MainService, private toast:ToastrService,private route:ActivatedRoute,private cookieService:CookieService) { }
  
  get f_name() {return this.profileForm.get('f_name')}

  get l_name() {return this.profileForm.get('l_name')}
  
  get Email() {return this.profileForm.get('Email')}
  
  get password() {return this.profileForm.get('password')}


  get f_names() {return this.profileForms.get('f_names')}

  get l_names() {return this.profileForms.get('l_names')}
  
  get Emails() {return this.profileForms.get('Emails')}

  onSubmit() {
    this.submitted = true;
      if(this.profileForms.invalid){
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
          console.log(res)
          this.showtoasterdf(res);
        })
        
      }
}
showtoasterdf(res){
  if(res.success){
    this.toast.success(res.success,res.message);
    this.router.navigateByUrl('/dashboard/user')
  }else{        
    this.toast.warning(res.success,res.message);
  }
  }
  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    this.Service.getuserbyid(this.param).subscribe((res)=>{
      this.myapp = res.data[0]
      this.f_namess = this.myapp.f_name;
      this.l_namess = this.myapp.l_name;
      this.emailss = this.myapp.email;
    })
  }

  onuser()
  {
  if(this.profileForms.invalid)
  {
  this.profileForms.get('f_name').markAsTouched();
  this.profileForms.get('l_names').markAsTouched();
  this.profileForms.get('Emails').markAsTouched();
}else{
    this.Service.putuser(this.param,{
      f_name:this.profileForms.value.f_names,
      l_name:this.profileForms.value.l_names,
      email:this.profileForms.value.Emails
      }).subscribe((res)=>{  
        this.showtoasterdff(res);
      })
    }
  }
    
  showtoasterdff(res){
    if(res.success){
      this.toast.success(res.success,res.message);
      this.router.navigateByUrl('/dashboard/user')
    }else{        
      this.toast.warning(res.success,res.message);
    }
    }
}
