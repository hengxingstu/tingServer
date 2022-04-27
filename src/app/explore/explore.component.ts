import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  apiUrl = environment.apiBaseUrl
  title!: String;
  Products: Product[] = [];
  constructor(private http:HttpClient,private loginService:LoginService,private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.router.params.subscribe( param =>{

      if (param['type'] == 'hot') {
        this.title = '热卖商品';
        this.getHotProducts();
      }
      else if (param['type'] == 'rate') {
        this.title = '好评如潮';
        this.getRateProducts();
      }
      else if (param['type'] == 'dt') {
        this.title = '基于决策树推荐';
        this.getDtProducts();
      }
    }

    )
  }

  getHotProducts(): void {
    this.http.get(`${this.apiUrl}/rest/product/hot?num=100&username=${localStorage.getItem("username")}`)
      .subscribe(
        (data:any) => {
          if(data['success'] == true){
            this.Products = data['products'];
            console.log(this.Products)
          }
        },
        err => {
          console.log('Something went wrong!');
        }
      );
  }


  getRateProducts(): void {
    this.http.get(`${this.apiUrl}/rest/product/rate?num=100&username=${this.loginService.user.username}`)
      .subscribe(
        (data:any) => {
          if(data['success'] == true){
            this.Products = data['products'];
            console.log(this.Products)
          }
        },
        err => {
          console.log('Something went wrong!');
        }
      );
  }

  getDtProducts(): void {
    this.http.get(`${this.apiUrl}/rest/product/stream?num=8&username=${localStorage.getItem("username")}`)
      .subscribe(
        (data:any) => {
          if(data['success'] == true){
            this.Products = data['products'];
            console.log(this.Products)
          }
        },
        err => {
          console.log('Something went wrong!');
        }
      );
  }
}
