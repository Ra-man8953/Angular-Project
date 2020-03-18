import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const api = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  
  constructor(private http: HttpClient,private cookie:CookieService) { }
  id:any = this.cookie.get('id'); 
  
  getuser(): Observable<any>  {
    return this.http.get(`${api}/users/all`)
  }
  getuserbyid(ids:any): Observable<any>  {
    return this.http.get(`${api}/users/user/`+ids)
  }
  getproduct(): Observable<any>{
    return this.http.get(`${api}/products`)
  }
  getproductbyid(ids:any): Observable<any>{
    return this.http.get(`${api}/products/product/`+ids)
  }
  postuser(myApp:any):Observable<any>{
    return this.http.post(`${api}/users/register`, myApp)
  }
  deleteuser(id:any):Observable<any>{
    return this.http.delete(`${api}/users/`+id)
  }
  userlogin(myApp:any):Observable<any>{
    return this.http.post(`${api}/users/logi`,myApp);
  }
  deleteproduct(id:any):Observable<any>{
    return this.http.delete(`${api}/products/delete/`+id)
  }
  postproduct(myApp:any):Observable<any>{
    return this.http.post(`${api}/products/`+this.id,myApp)
  }
  putproduct(param:any,myApp:any):Observable<any>{
    return this.http.put(`${api}/products/`+param,myApp)
  }
  putuser(param:any,myApp:any):Observable<any>{
    return this.http.put(`${api}/users/update/`+param,myApp)
  }
}
