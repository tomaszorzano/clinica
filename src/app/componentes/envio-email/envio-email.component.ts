import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-envio-email',
  templateUrl: './envio-email.component.html',
  styleUrls: ['./envio-email.component.css']
})
export class EnvioEmailComponent implements OnInit {

  public usuario: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

  reenviarEmailVerificacion(){
    this.authSvc.enviarVerficacionEmail();
  }

}
