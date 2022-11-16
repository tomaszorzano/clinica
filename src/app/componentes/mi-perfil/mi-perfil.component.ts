import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
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
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
  ]
  
  
})

export class MiPerfilComponent implements OnInit {
  usuarioPerfil: Usuario;
  public visible:boolean=true;
  constructor(private authSvc: AuthService) {
    
    this.usuarioPerfil = this.authSvc.usuarioLogueado;
    console.log(this.usuarioPerfil);
  }

  ngOnInit(): void {
  }

}
