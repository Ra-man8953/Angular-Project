import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  f_name:any;
  l_name:any;
  email:any;
  password:any;

  constructor(private toast:ToastrService,private route:Router,private service:MainService,private cookie:CookieService) { }

  ngOnInit(): void {
    var id = this.cookie.get('id');
this.service.getuserbyid(id).subscribe((res)=>{
this.f_name=res.data[0].f_name;
this.l_name=res.data[0].l_name;
this.email=res.data[0].email;
this.password = res.data[0].password;
})
  }
}
