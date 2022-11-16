import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { trigger, transition, animate, style, state, group } from '@angular/animations';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('1000ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class TurnosComponent implements OnInit {

  usuarios: any = [];
  usuario: Usuario = new Usuario;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnos: any;

  constructor(private turnoSvc: TurnoService,  private authSvc: AuthService) {
    this.usuario = this.authSvc.usuarioLogueado;
    console.log(this.usuario);
    
    if(this.usuario != null){
      this.turnosOcupados = this.turnoSvc.db.collection("turnos", ref => ref.orderBy("fecha"));
      this.cargarTurnos();
    }
  }

  ngOnInit(): void {
  }

  cargarTurnos() {
    // this.turnoSvc.getTurnos().subscribe(turnos => {
    //   this.turnosOcupados = turnos;
    // });

    this.turnosOcupados.snapshotChanges().pipe(
      map( (data: any) => {
        this.turnos = new Array<Turno>();
        data.map((item: any) => {
              console.log(item);
              //var turno = item;
              var turno = new Turno();
              turno.id = item.payload.doc.id;
              turno.idEspecialista = item.payload.doc.data().idEspecialista;
              turno.idPaciente = item.payload.doc.data().idPaciente;
              turno.estado = item.payload.doc.data().estado;
              //turno.paciente = new Usuario();
              turno.paciente = item.payload.doc.data().paciente;
              turno.especialista = item.payload.doc.data().especialista;
              turno.especialidad = item.payload.doc.data().especialidad;
              turno.fecha = item.payload.doc.data().fecha;
              turno.hora = item.payload.doc.data().hora;
              turno.comentariosPaciente = item.payload.doc.data().comentariosPaciente;
              turno.comentariosEspecialista = item.payload.doc.data().comentariosEspecialista;
              turno.comentariosAdmin = item.payload.doc.data().comentariosAdmin;
              turno.historiaClinica = new HistoriaClinica();
              this.turnos.push(turno);

        })
      })
    ).subscribe();

  }

  asignarTurno(turno: any) {

    // var data = especialidad;
    this.turnoSeleccionado = turno;

  }
}
