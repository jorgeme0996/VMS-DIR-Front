import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { UiService } from './ui.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = null;
  usuario = {}

  constructor(private http: HttpClient, private navCtrl: NavController, private uiService: UiService) { }

  login(username: string, password: string){
    const data = { username, password }

    return new Promise(resolve => {  
      this.http.post(`${URL}/user/login`, data)
       .subscribe(resp => {
         if(resp['ok']){
           this.guardarToken(resp['token']);
           resolve(true);
         } else {
           this.token = null;
           localStorage.clear();
           resolve(false);
         }
       })
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    await localStorage.setItem('token', token);
  }

  async cargarToken(){
    this.token = await localStorage.getItem('token') || null;
  }

  async validaToken(): Promise<boolean>{
    await this.cargarToken();
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'Authorization': this.token
      });
      this.http.get(`${URL}/user/auth/`, {headers})
        .subscribe(resp => {
          if(resp['ok']) {
            resolve(true)
            this.usuario = resp['usuario']
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false)
          }
        })
    })
  }

  getUser() {
    this.cargarToken();
    const headers = new HttpHeaders({
      'Authorization': this.token
    });
    return this.http.get(`${URL}/user/auth/`, {headers});
  }

  async validaRole():Promise<boolean>{
    await this.cargarToken();
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve=>{
      const headers = new HttpHeaders({
        'Authorization': this.token
      });
      this.http.get(`${URL}/user/auth/dir`, {headers})
        .subscribe((resp:any)=>{
          if(resp['ok']){
            resolve(true)
          } else {
            this.navCtrl.navigateRoot('/login');
            localStorage.clear();
            this.uiService.alertaInformativa(resp.err.message)
            resolve(false)
          }
      })
    });
  }
}