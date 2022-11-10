import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('800ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('800ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class BienvenidaComponent implements OnInit {

  public visible:boolean=true;
  islogged = false;
  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  
  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.usuario$.subscribe((result: any) => {
      if(result != null)
      {
        this.islogged = true;
      }
    });

    console.log(this.authSvc.isLoggedIn);
    
    if(this.authSvc.isLoggedIn){
      this.islogged = true;
    }
    else{
      this.islogged = false;
    }
    console.log(this.islogged);
    
  }

  goIngreso(){
    this.router.navigate(['ingreso/login']);
  }

  goRegistro(){
    this.router.navigate(['ingreso/registro']);
  }
}