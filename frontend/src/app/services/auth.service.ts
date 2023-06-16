import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequest } from '../LoginRequest';
import { HttpClient, HttpResponse} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseAPi : string = environment.apiBaseUrl;

  form : FormGroup = new FormGroup({
     username : new FormControl(''),
     password : new FormControl('')
  });

  constructor(private http : HttpClient) { }


   

  public login(request : LoginRequest) {
      return this.http.post(`${this.baseAPi}/token`, 
      request,{
        responseType: 'text',
        observe : 'response'
      }).pipe(map((response : HttpResponse<any>) => {
          const token = response.body;
          const headers = response.headers;

          // // const bearerToken = headers.get('Authorization');
          // // const token = bearerToken!.replace('Bearer', '')
          // // console.log(token)

          // console.log('Bearer token: ', headers.get('Authorization'))
          // console.log('My token: ', response.body )

          // localStorage.setItem('token', token);


           localStorage.setItem('token', token);

           this.form.reset();

         return token
      }))
  }

  getToken(){

    return localStorage.getItem('token');
  }

  isLoggedIn(){

    return this.getToken !== null;
  }

  logOut(){
    localStorage.removeItem('token');
  }


}
