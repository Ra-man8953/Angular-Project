import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddprofileComponent } from './addprofile/addprofile.component';


const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'product', component:ProductComponent},
  {path:'user',component:UserComponent},
  {path:'profile',component:ProfileComponent},
  {path:'adduser',component:AdduserComponent},
  {path:'adduser/:id',component:AdduserComponent},
  {path:'addproduct/:id',component:AddproductComponent},
  {path:'addproduct',component:AddproductComponent},
  {path:'addprofile',component:AddprofileComponent},
  {path:'addprofile/:id',component:AddprofileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
