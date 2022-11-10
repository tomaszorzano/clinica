import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { trigger, transition, animate, style, state, group } from '@angular/animations';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
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
export class ListaUsuariosComponent implements OnInit {

  @Output() usuarioSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Usuario[] = [];
  usuario!: Usuario;

 
  constructor(public usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }


  cargarUsuarios(){
    this.usuarioSvc.getUsuarios().subscribe((usuarios:any) => {
      this.usuarios = usuarios;
      //console.log(usuarios);
    });
  }

  mostrarUsuario(usuario: any){
    this.usuarioSeleccionado.emit(usuario);
  }
}