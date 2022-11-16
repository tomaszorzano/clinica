import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {

  listaUsuarios: any[] = [];
  public usuarioElegido: Usuario = new Usuario();
  registro = false;
  public mostrarDetalle = false;


  constructor() { }

  ngOnInit(): void {
  }

  

  mostrarDatosUsuarioSeleccionado(usuario: any)
  {
    console.log(usuario.img1Url);
    console.log(usuario.img2Url);
    this.usuarioElegido = usuario;
    this.mostrarDetalle = true;
 
  }

  mostrarRegistro(){
    this.registro = true;
  }


}