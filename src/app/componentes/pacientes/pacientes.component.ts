import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  turnos!: any;
  turnoSeleccionado!: any;
  open: boolean = false;
  especialista: Usuario = new Usuario();
  turnosPacientesAtendidos: any[] = [];
  turnosEspecialista: any[] = [];

  constructor(public turnoSvc: TurnoService, private authSvc: AuthService) {
    this.especialista = this.authSvc.usuarioLogueado;
    //this.turnos = this.turnoSvc.getTurnos();


  }

  ngOnInit(): void {
    //console.log(this.especialista.email);
    this.turnoSvc.getTurnos().subscribe((element: any) => {

      this.turnos = element;
      if(this.turnos != null && this.especialista){
        this.turnosEspecialista = this.turnos.filter((item: any) => item.especialista.email == this.especialista.email);
      }

        if(this.turnosEspecialista != null)
        {
          for (let i = 0; i < this.turnosEspecialista.length; i++) {
            var espe = new Usuario();
            var aux = new Usuario();
            if( this.turnosEspecialista[i] != null){
              espe = this.turnosEspecialista[i + 1].especialista; 
              aux = this.turnosEspecialista[i].especialista;
              if (espe.email === aux.email) {
                this.turnosPacientesAtendidos.push(this.turnosEspecialista[i]);
              }

            }
          }
        }

     // });
      console.log(this.turnosPacientesAtendidos);
      
    });
  }

  abrirMenu() {

    var element = <HTMLElement><unknown>document.getElementById("menu");
    if (!this.open) {
      console.log(this.open + "en false")
      element.classList.remove("d-none");
      element.classList.add("d-block");

      this.open = true;
    } else {
      console.log(this.open + "en true")
      element.classList.remove("d-block");
      element.classList.add("d-none");

      this.open = false;
    }
  }

  emitirUser(turno: any) {
    this.turnoSeleccionado = turno;
  }
}