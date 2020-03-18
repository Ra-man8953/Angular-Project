import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  
  data: any;

  constructor(private Service:MainService,private toast:ToastrService,private router:Router) { }
 
  delete(id) {
    this.Service.deleteuser(id)
    .subscribe((res) => {
    this.showtoasterdf(res)
    this.Service.getuser().subscribe((resp)=>{
      this.data = resp;
      })
  });
}
  showtoasterdf(res){
    if(res.success){    
        this.toast.success(res.success,res.message);
    }else{        
      this.toast.warning(res.success,res.message);
    }
    }

  ngOnInit(): void {
    this.Service.getuser().subscribe((res)=>{
      this.data = res;
    })
  }
  

}
