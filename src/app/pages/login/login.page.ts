import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { NavController} from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    username: '',
    password: ''
  }

  constructor(private authSerice: AuthService, 
              private navCtrl: NavController,
              private uiService: UiService) { }

  ngOnInit() {
    localStorage.clear();
  }

  async login(fLogin: NgForm) {
    if(fLogin.invalid){return;}
    const valido = await this.authSerice.login(this.loginUser.username, this.loginUser.password);

    if(valido){
      //navegar a tabs
      this.navCtrl.navigateRoot('main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformativa('Usuario o contraseña invalidos');
    }
  }

}