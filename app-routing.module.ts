import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthServiceService } from './auth-service.service';


const routes: Routes = [
  { path: '', loadChildren: () => (import('./home/home.module').then(m => m.HomeModule)) },
  { path: 'login', loadChildren: () => (import('./login/login.module').then(m => m.LoginModule)) },
  { path: 'register', loadChildren: () => (import('./register/register.module').then(m => m.RegisterModule)) },
  { path: 'dashboard', loadChildren: () => (import('./dashboard/dashboard.module').then(m => m.DashboardModule)),canActivate:[AuthServiceService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
