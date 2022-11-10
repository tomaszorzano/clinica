import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-especialidad',
  templateUrl: './lista-especialidad.component.html',
  styleUrls: ['./lista-especialidad.component.css']
})
export class ListaEspecialidadComponent implements OnInit {

  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialidades: any[] = [];
  especialidad: any;

  constructor(public usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    //this.cargarEspecialidades()
  }


  asignarEspecialidad(especialidad: any){
    console.log(especialidad);
    
    this.especialidadSeleccionada.emit(especialidad);
  }
  
}