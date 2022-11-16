import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MisTurnosEspecialistaComponent } from './componentes/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { IngresoModule } from './ingreso/ingreso.module';

const routes: Routes = [
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'seccionUsuarios', component: SeccionUsuariosComponent},
  {path: '', redirectTo:'bienvenida', pathMatch:'full'},
  {path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => IngresoModule)},
  {path: 'miPerfil', component: MiPerfilComponent},
  {path: 'turnos', component: TurnosComponent},
  {path: 'misTurnos', component: MisTurnosComponent},
  {path: 'misTurnosEspecialista', component: MisTurnosEspecialistaComponent},
  {path: 'solicitarTurno', component: SolicitarTurnosComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'informes', component: EstadisticasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
