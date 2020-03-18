import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {Validators} from '@angular/forms'
import { MainService } from '../../main.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  data:any;
  param:any;
  myapp:any;
  submitted = false;
  p_names:any;
  p_descs:any;
  p_images:any;
  profileForm = this.fb.group({
    p_name: ['',Validators.required],
    p_desc: ['',Validators.required],
    p_image: ['',Validators.required]
  });
  constructor(private fb: FormBuilder,private route:ActivatedRoute,private router:Router,private Service:MainService, private toast:ToastrService,private cookie:CookieService) { }
  get p_name() {return this.profileForm.get('p_name')}

  get p_desc() {return this.profileForm.get('p_desc')}

  get p_image() {return this.profileForm.get('p_image')}


  onSubmit() {
    this.submitted = true;
      if(this.profileForm.invalid){
        this.profileForm.get('p_name').markAsTouched();
        this.profileForm.get('p_desc').markAsTouched();
        this.profileForm.get('p_image').markAsTouched();
      }
      else{   
        this.Service.postproduct({
          p_name:this.profileForm.value.p_name,
          p_desc:this.profileForm.value.p_desc,
          p_image:this.profileForm.value.p_image
        }).subscribe((res)=>{
          this.showtoasterdf(res);
        })
        
      }
}
showtoasterdf(res){
  if(res.success){
    this.toast.success(res.success,res.message);
    this.router.navigateByUrl('/dashboard/product')
  }else{        
    this.toast.warning(res.success,res.message);
  }
  }
  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    this.Service.getproductbyid(this.param).subscribe((res)=>{
      this.myapp = res.data[0]
      console.log(this.myapp)
      this.p_descs = this.myapp.p_desc;
      this.p_images = this.myapp.p_image;
      this.p_names = this.myapp.p_name;
    })
  }
  onproduct(){
    this.Service.putproduct(this.param,{
      p_name:this.profileForm.value.p_name,
      p_desc:this.profileForm.value.p_desc,
      p_image:this.profileForm.value.p_image
      }).subscribe((res)=>{
        this.showtoasterdff(res);
      })
    }
    
  showtoasterdff(res){
    if(res.success){
      this.toast.success(res.success,res.message);
      this.router.navigateByUrl('/dashboard/product')
    }else{        
      this.toast.warning(res.success,res.message);
    }
    }

}
