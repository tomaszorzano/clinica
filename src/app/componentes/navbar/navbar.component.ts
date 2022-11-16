import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  logueado = false;
  adminLogueado = false;
  pacienteLogueado = false;
  especialistaLogueado = false;
  usuario: any;
  email!: string;

  constructor(private router: Router, private authSvc: AuthService, public usuarioSvc: UsuarioService) { }

   ngOnInit(): void {
      this.obtenerUsuarioLogueado();
  }

  obtenerUsuarioLogueado(){
   
      this.usuario$.subscribe((result: any) => {
        if(result!= null)
        {
          this.email = result['email'];
          this.usuarioSvc.getUsuarios().subscribe(usuarios => {
            usuarios.forEach(usuario => {
              //console.log(usuario);
              if(usuario.email == this.email){
                this.usuario = usuario;
         
                if(this.usuario.paciente){
                  this.usuario.administrador = false;
                  this.especialistaLogueado = false;
                  this.pacienteLogueado = this.usuario.paciente;
                }
                if(this.usuario.especialista){
                  this.usuario.administrador = false;
                  this.especialistaLogueado = this.usuario.especialista;
                  this.pacienteLogueado = false;
                }
                if(this.usuario.administrador){
                  this.adminLogueado = this.usuario.administrador;
                  this.especialistaLogueado = false;
                  this.pacienteLogueado = false;
                }
              }
            })
          });
        }
      });
  }

  goRegistro(){
    this.router.navigate(['ingreso/registro']);
  }

  goLogin(){
    this.router.navigate(['ingreso/login']);
  }

  goBienvenida(){
    this.router.navigate(['bienvenida']);
  }

  goSeccionUsuarios(){
    this.router.navigate(['seccionUsuarios']);
  }

  onLogout(){
    this.logueado = false;
    this.adminLogueado = false;
    this.especialistaLogueado = false;
    this.pacienteLogueado = false;
    this.authSvc.signOut();
    this.router.navigate(['bienvenida']);
  }

  goMiPerfil(){
    this.router.navigate(['miPerfil']);
  }

  goMisTurnosPaciente(){
    this.router.navigate(['misTurnos']);
  }

  goMisTurnosEspecialista(){
    this.router.navigate(['misTurnosEspecialista']);
  }

  goTurnos(){
    this.router.navigate(['turnos']);
  }

  goSolicitarTurno(){
    this.router.navigate(['solicitarTurno']);
  }

  goPacientes(){
    this.router.navigate(['pacientes']);
  }

  goInformes(){
    this.router.navigate(['informes']);
  }
}
