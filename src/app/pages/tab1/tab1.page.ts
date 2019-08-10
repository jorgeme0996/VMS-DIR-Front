import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  user: any = {}

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(){
    this.authService.getUser().subscribe((data:any)=>{
      this.user = data.user.user;
    })
  }

  aceptar(item){

  }

  denegar(item){

  }

}