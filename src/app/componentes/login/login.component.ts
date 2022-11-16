import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Imagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  usuario: Usuario = new Usuario();
  msjError!: string;
  //usuarios!: any;
  usuarios: Array<Usuario> = new Array<Usuario>();
  arrayUsuarios: Array<Usuario> = new Array<Usuario>();

  constructor(public router: Router, public authSvc: AuthService, public usuarioSvc: UsuarioService) {

  }

  ngOnInit(): void {

  }

  async onLogin() {
    this.usuario.email = this.email;
    this.usuario.password = this.password;
    await this.authSvc.login(this.usuario);
    //console.log("error", this.authSvc.msjError);
    if (this.authSvc.msjError != "") {
      this.msjError = this.authSvc.msjError;
    }
    else {
      this.router.navigate(['home']);
    }
  }

  async logAdmin() {
    this.email = 'tomas.d.zorzano@gmail.com';
    this.password = '123123123';
  }
  async logE1() {
    this.email = 'especialista@gmail.com';
    this.password = '123123123';
  }
  async logE2() {
    this.email = 'especialista2@gmail.com';
    this.password = '123123123';
  }
  async logP1() {
    this.email = 'paciente@gmail.com';
    this.password = '123123123';
  }
  async logP2() {
    this.email = 'paciente2@gmail.com';
    this.password = '123123123';
  }
  async logP3() {
    this.email = 'paciente3@gmail.com';
    this.password = '123123123';
  }



  ingresar() {
    this.usuario.email = this.email;
    this.usuario.password = this.password;

    this.authSvc.login(this.usuario).then((result) => {
      //this.authSvc.isLoggedIn = true;
      console.log('Login exitoso', result);

      if (this.authSvc.msjError != "") {
        this.msjError = this.authSvc.msjError;
      }

      this.usuarioSvc.addLogIngresos(this.usuario.email);
    })
      .catch((res) => {
        if (res.message == "The password is invalid or the user does not have a password.") {
          this.msjError = "La contraseña ingresada es invalida."
        }
      });
  }


  activate() {
    document.querySelector('.fab')?.classList.toggle('fab-activate')
    document.querySelector('.box')?.classList.toggle('box-activate')
  }



}