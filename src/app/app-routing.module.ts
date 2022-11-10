import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { IngresoModule } from './ingreso/ingreso.module';

const routes: Routes = [
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: '', redirectTo:'bienvenida', pathMatch:'full'},
    {path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => IngresoModule)},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
