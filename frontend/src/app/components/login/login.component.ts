import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(public service : AuthService, private route : Router){

  }

  ngOnInit(): void {
       this.isLoggingIn();

  }

  getAuthToken() : void {
   console.log('local ' ,this.service.getToken())
  }

  isLoggingIn(){
    if(this.service.isLoggedIn())
             this.route.navigate(['']);
  }

  onLogin(){
  
    this.service.login(this.service.form.value).subscribe(result => {
        this.route.navigate(['']);
    })
  }
 
  onLogout(){
    this.service.logOut();
    this.route.navigate(['/login'])
  }

}
