import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Horarios } from 'src/app/clases/horarios';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HorariosService } from 'src/app/services/horarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { trigger, transition, animate, style, state, group } from '@angular/animations';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('2000ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class MisHorariosComponent implements OnInit {

 //@Output() usuarioRegistrado: EventEmitter<any> = new EventEmitter<any>();
 formulario!: FormGroup;
 @Input() usuarioHorarios!: Usuario;
 especialidad!: string;
 horario!: Horarios;
 horarioAux!: Horarios;
 dia!: string;
 horarios!: any;
 usuario: Usuario = new Usuario();
 horariosUsuario!: any;
 captchaPropio:boolean = false;

 constructor(public fv: FormBuilder, private usuarioSvc: UsuarioService, private authSvc: AuthService) {
   this.formulario = fv.group({
     especialidad: ["", Validators.required],
     lunesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     lunesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     martesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     martesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     miercolesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     miercolesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     juevesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     juevesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     viernesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     viernesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     sabadoHoraDesde: ["", [ this.validarMinutos, this.validarSabadoHora]],
     sabadoHoraHasta: ["", [ this.validarMinutos, this.validarSabadoHora]]

   });

   this.usuario = this.authSvc.usuarioLogueado;


 }

 ngOnInit(): void {
   //console.log(this.usuarioHorarios.especialidades);
 }

 cargarTurnos() {
  // this.turnoSvc.getTurnos().subscribe(turnos => {
  //   this.turnosOcupados = turnos;
  // });

  this.horarios.snapshotChanges().pipe(
    map( (data: any) => {
      this.horariosUsuario = new Array<Horarios>();
      data.map((item: any) => {
        if(item.payload.doc.data().idEspecialista == this.usuario.id){
          console.log(item);
          //var turno = item;
          var horario = new Horarios();
          //horario.id = item.payload.doc.id;
          horario.idEspecialista = item.payload.doc.data().idEspecialista;
          horario.horarioLunes = item.payload.doc.data().horarioLunes;
          horario.horarioMartes = item.payload.doc.data().horarioMartes;
          horario.horarioMiercoles = item.payload.doc.data().horarioMiercoles;
          horario.horarioJueves = item.payload.doc.data().horarioJueves;
          horario.horarioViernes = item.payload.doc.data().horarioViernes;
          horario.horarioSabado = item.payload.doc.data().horarioSabado;

          console.log(this.horariosUsuario);

        }
      })
    })
  ).subscribe();
  console.log(this.horariosUsuario);
}

 validarMinutos(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != "" && nombre != null){
     var minutos = nombre.split(':')[1];
     var minCero = minutos.includes("00");
     var minTreinta = minutos.includes("30");
     //console.log(minutos);

     if (minCero) {
       return null;
     }

     if (minTreinta) {
       return null;
     }

     if(!minCero && !minTreinta)
     return { minValido: true };
     
   }
   return null;
 }

 validarHora(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != "" && nombre != null){
     var hora = nombre.split(':')[0];
     //console.log(hora);
     
     if (hora <= 8 || hora > 19) {
       return { horaValido: true };
     }
   }
   return null;
 }

 validarSabadoHora(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != "" && nombre != null){
     var hora = nombre.split(':')[0];
     //console.log(hora);
     
     if (hora <= 8 || hora > 14) {
       return { horaValido: true };
     }
   }
   return null;

 }


 registrar() {
   console.log(this.formulario);
   this.horario = new Horarios();
   this.horario.horarioLunes = [{ desde: this.formulario.controls['lunesHoraDesde'].value, hasta: this.formulario.controls['lunesHoraHasta'].value }];
   this.horario.horarioMartes = [{ desde: this.formulario.controls['martesHoraDesde'].value, hasta: this.formulario.controls['martesHoraHasta'].value }];
   this.horario.horarioMiercoles = [{ desde: this.formulario.controls['miercolesHoraDesde'].value, hasta: this.formulario.controls['miercolesHoraHasta'].value }];
   this.horario.horarioJueves = [{ desde: this.formulario.controls['juevesHoraDesde'].value, hasta: this.formulario.controls['juevesHoraHasta'].value }];
   this.horario.horarioViernes = [{ desde: this.formulario.controls['viernesHoraDesde'].value, hasta: this.formulario.controls['viernesHoraHasta'].value }];
   this.horario.horarioSabado = [{ desde: this.formulario.controls['sabadoHoraDesde'].value, hasta: this.formulario.controls['sabadoHoraHasta'].value }];
   this.horariosUsuario = this.horario;
   this.usuario.horarios = this.horariosUsuario;

   this.usuarioSvc.updateUsuarioHorarios(this.usuario);
   this.formulario.reset();
 }

 resolvedPropio(captcha: boolean){
  this.captchaPropio = captcha;
}


}