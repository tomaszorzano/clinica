import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {

  //public usuario$: Observable<any> = this.authSvc.afAuth.user;
  @Input() turnoDetalle!: any;
  aceptado = "ACEPTADO";
  rechazado = "RECHAZADO";
  cancelado = "CANCELADO";
  finalizado = "FINALIZADO";
  pendiente = "PENDIENTE";
  realizado = "REALIZADO";
  email!: string;
  usuario: Usuario = new Usuario();
  nuevoComentarioPaciente!: string;
  nuevoComentarioEspecialista!: string;
  nuevoComentarioAdmin!: string;
  cancela: boolean = false;
  rechaza: boolean = false;
  finaliza: boolean = false;
  noMostrarEnviarComentarioEsp: boolean = false;
  noMostrarEnviarComentarioPac: boolean = false;
  noMostrarEnviarComentarioAdmin: boolean = false


  constructor(private turnoSvc: TurnoService, private authSvc: AuthService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.usuario = this.authSvc.usuarioLogueado;
    //this.obtenerUsuarioLogueado();
  }

//   obtenerUsuarioLogueado(){
   
//     this.usuario$.subscribe((result: any) => {
//       if(result!= null)
//       {
//         this.email = result['email'];
//         this.usuarioSvc.getUsuarios().subscribe(usuarios => {
//           usuarios.forEach(usuario => {
//             if(usuario.email == this.email){
//               console.log(usuario);
//               this.usuario = usuario;
//             }
//           })
//         });
//       }
//     });
// }

  cancelar(){
    this.turnoDetalle.estado = this.cancelado;
    this.cancela = true;
    this.rechaza = false;
    this.finaliza = false;
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  rechazar(){
    this.turnoDetalle.estado = this.rechazado;
    this.cancela = false;
    this.rechaza = true;
    this.finaliza = false;
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  aceptar(){
    this.turnoDetalle.estado = this.aceptado;
    this.turnoSvc.updateTurnoEstado(this.turnoDetalle);
  }

  finalizar(){
    this.cancela = false;
    this.rechaza = false;
    this.finaliza = true;
    this.turnoDetalle.estado = this.finalizado;
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  enviarComentario(){
    if(this.usuario.especialista){
      this.turnoDetalle.comentariosEspecialista = this.nuevoComentarioEspecialista;
      this.turnoSvc.updateTurnoEstadoComentariosEspecialista(this.turnoDetalle);
      this.noMostrarEnviarComentarioEsp = true;
      this.nuevoComentarioEspecialista = "";
    }
    if(this.usuario.paciente){
      this.turnoDetalle.comentariosPaciente = this.nuevoComentarioPaciente;
      this.turnoSvc.updateTurnoEstadoComentariosPaciente(this.turnoDetalle);
      this.noMostrarEnviarComentarioPac = true;
      this.nuevoComentarioPaciente = "";
    }
    if(this.usuario.administrador){
      this.turnoDetalle.comentariosAdmin = this.nuevoComentarioAdmin;
      this.turnoSvc.updateTurnoEstadoComentariosAdmin(this.turnoDetalle);
      this.noMostrarEnviarComentarioAdmin = true;
      this.nuevoComentarioAdmin = "";
    }

    //this.turnoDetalle = null;
  }

}
