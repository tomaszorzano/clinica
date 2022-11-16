import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/services/turno.service';
import { trigger, transition, animate, style, state, group } from '@angular/animations';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('2000ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class TablaTurnosComponent implements OnInit {

  @Output() turnoSeleccionado: EventEmitter<Turno> = new EventEmitter<Turno>();
  @Input() turnos: any[] = [];
  turno: any;

  constructor(public turnoSvc: TurnoService) { }

  ngOnInit(): void {
  }

  asignarTurno(turno: any){
    this.turnoSeleccionado.emit(turno);
  }
}
