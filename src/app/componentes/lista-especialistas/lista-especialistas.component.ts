import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.css']
})
export class ListaEspecialistasComponent implements OnInit {

  
  @Output() especialistaSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Usuario[] = [];
  usuario!: Usuario;
 
  constructor() { }

  ngOnInit(): void {
    //this.cargarUsuarios()
  }

  enviarEspecialista(usuario: any){
    console.log(usuario);
    
    this.especialistaSeleccionado.emit(usuario);
  }

}
