import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  webUrl = environment.webServerURL

  constructor( private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(user:User){
    console.log(user)
    this.loginService.login(user)
  }

  register(){
    console.log("跳转注册")
    console.log(webkitURL + "/register")
    window.location.href = environment.webServerURL + "/register"
  }



}
