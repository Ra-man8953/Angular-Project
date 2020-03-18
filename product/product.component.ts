import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  data:any;
  myapp:any;
  constructor(private Service:MainService,private toast:ToastrService) { }

  delete(id) {
    this.Service.deleteproduct(id)
    .subscribe((res) => {
    this.showtoasterdf(res)
    this.Service.getproduct().subscribe((resp)=>{
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
    this.Service.getproduct().subscribe((res)=>{
      this.data = res; 
    })
  }
}
