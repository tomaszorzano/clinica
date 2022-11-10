import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvioEmailComponent } from '../componentes/envio-email/envio-email.component';
import { LoginComponent } from '../componentes/login/login.component';
import { RegistroComponent } from '../componentes/registro/registro.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent },
  {path: 'envio-email', component: EnvioEmailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
