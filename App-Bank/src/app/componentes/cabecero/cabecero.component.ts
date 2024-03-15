import { Component, OnInit } from '@angular/core';
import { loginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent  implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(private loginService:loginService, private router: Router){}

  ngOnInit(){
    this.loginService.getAuth().subscribe( auth =>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
      }
    })
  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
