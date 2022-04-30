import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl:string = environment.apiBaseUrl
  user:User = new User;
  data = new Object;
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * 检查用户是否登陆
   */
  public isLogin(): boolean {
    if(localStorage.getItem("username") == null){
      return false
    }
      this.user.username = localStorage.getItem("username")!
    return true
  }

  public getUsername(): String{
    return this.user.username;
  }

  // 登陆方法
  public login(user:User): void{
      this.http.get(`${this.apiUrl}/rest/users/login?username=${user.username}&password=${user.password}`)
      .subscribe(
        (data: any) => {
          if (data['success'] === true) {
            this.user = data['user'];
            localStorage.setItem("username",user.username)
            console.log("本地存储了"+ localStorage.getItem("username"))
            this.router.navigate(['/'])
          }
          this.data = data;
        },
        err => {
          console.log("服务器错误！")
          // this.data['success'] = false;
          // this.data['message'] = '服务器错误！';
        }
      )
  }
  // 注册方法
  register(user:User):void {
    //this.router.navigate(['/login']);
    this.http
      .get(`${this.apiUrl}/rest/users/register?username=${user.username}&password=${user.password}`)
      .subscribe(
        (data:any) => {
          if(data['success'] === true){
            console.log('注册成功')
            this.data = data;
            this.router.navigate(['/login']);
          }else if(data['success'] === false && data['message'] === " 用户名已经被注册！"){
            alert('用户名已经被注册！')
          }
        },
        (err) => {
          console.log('发生什么事了!');
          // this.data['success'] = false;
          // this.data['message'] = '服务器错误！';
        }
      );
  }


  logout():void{
    console.log(this.user)
    this.user = new User;
    localStorage.removeItem("username")
    this.router.navigate(['/login']);
    console.log(this.user)
  }

}
