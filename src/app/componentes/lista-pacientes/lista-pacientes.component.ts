import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {

  @Output() pacienteSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Usuario[] = [];
  usuario!: Usuario;
 
  constructor() { }

  ngOnInit(): void {
    //this.cargarUsuarios()
  }

  enviarPaciente(usuario: any){
    console.log(usuario);
    
    this.pacienteSeleccionado.emit(usuario);
  }

}