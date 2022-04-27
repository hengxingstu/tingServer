import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User;
  msg = new Object;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  public register(form: NgForm){
    console.log(form.value)
    if(form.value.password == form.value.passwordAgain){
      this.user.username = form.value.username
      this.user.password = form.value.password
      console.log('验证成功，正在注册' + this.user.username)
      this.loginService.register(this.user)
    }
    else{
      alert("验证失败，请检查两次密码的拼写")
    }


  }
}
