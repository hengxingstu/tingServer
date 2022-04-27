import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:User = new User;
  webUrl = environment.webServerURL
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLogin()
    this.user.username = this.getUsername()
  }


  getUsername(): any{
    return this.loginService.getUsername();
  }

  isLogin(){
    return this.loginService.isLogin()
  }


  logout(): void {
    this.loginService.logout();
  }

}
