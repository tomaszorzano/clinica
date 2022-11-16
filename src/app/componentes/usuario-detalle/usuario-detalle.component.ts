import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s 100ms ease-in')
      ]),
      transition(':leave', [
        animate('0.1s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuarioDetalle: Usuario = new Usuario();

  constructor(private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    
  }

  habilitarEspecialista(){
    console.log(this.usuarioDetalle);
    
    this.usuarioDetalle.habilitado = true;
    this.usuarioSvc.updateUsuarioEspecialista(this.usuarioDetalle);

  }

}