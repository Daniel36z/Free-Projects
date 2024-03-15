import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { loginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  email:string;
  password:string;

  constructor(private router:Router, private loginService:loginService){}

  login(){
    this.loginService.login(this.email,this.password)
    .then(res =>{
      this.router.navigate(['/']);
    })
    .catch(error=>{
      console.log(error);
    })
  }



}
