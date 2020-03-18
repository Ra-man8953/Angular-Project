import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrls: ['./addprofile.component.css']
})
export class AddprofileComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  Addus(){
    this.router.navigateByUrl('/dashboard/profile')
  }

}
