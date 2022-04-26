import { Component } from '@angular/core';
import { LoginService } from "./service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TingT电商系统';

  constructor(private loginservice: LoginService){}
  // ngOnInit(){
  //   if (this.loginservice.isLogin()) {
  //     alert("登陆了")
  //   }
  //   else{alert("没登录")}
  // }


}
