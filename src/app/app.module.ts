import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from "ng-recaptcha";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsuarioDetalleComponent } from './componentes/usuario-detalle/usuario-detalle.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoModule } from './ingreso/ingreso.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AltaEspecialidadComponent } from './componentes/alta-especialidad/alta-especialidad.component';
import { ListaEspecialidadComponent } from './componentes/lista-especialidad/lista-especialidad.component';
import { CaptchaComponent } from './componentes/captcha/captcha.component';
import { CaptchaDirective } from './directivas/captcha.directive';
import { HighchartsChartModule } from 'highcharts-angular';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { FilterEspecialistaPipe } from './pipes/filter-especialista.pipe';
import { FilterPacientePipe } from './pipes/filter-paciente.pipe';
import { FilterTurnosPipe } from './pipes/filter-turnos.pipe';
import { EstadoDirective } from './directivas/estado.directive';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { TurnoDetalleComponent } from './componentes/turno-detalle/turno-detalle.component';
import { TurnosFinalizadosComponent } from './componentes/turnos-finalizados/turnos-finalizados.component';
import { TurnosPorDiaComponent } from './componentes/turnos-por-dia/turnos-por-dia.component';
import { TurnosPorEspecialistaComponent } from './componentes/turnos-por-especialista/turnos-por-especialista.component';
import { AltaHistoriaClinicaComponent } from './componentes/alta-historia-clinica/alta-historia-clinica.component';
import { CantTurnosPorEspecialidadComponent } from './componentes/cant-turnos-por-especialidad/cant-turnos-por-especialidad.component';
import { ExcelTurnosComponent } from './componentes/excel-turnos/excel-turnos.component';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { LogIngresosComponent } from './componentes/log-ingresos/log-ingresos.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';
import { MisTurnosEspecialistaComponent } from './componentes/mis-turnos-especialista/mis-turnos-especialista.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { PdfEspecialistaComponent } from './componentes/pdf-especialista/pdf-especialista.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { CommonModule } from '@angular/common';
import { EnvioEmailComponent } from './componentes/envio-email/envio-email.component';
import { ResaltarDirective } from './directivas/resaltar.directive';


@NgModule({
  declarations: [
    AppComponent,
    AltaUsuarioComponent,
    BienvenidaComponent,
    NavbarComponent,
    EnvioEmailComponent,
    RegistroComponent,
    UsuarioDetalleComponent,
    LoginComponent,
    ListaUsuariosComponent,
    AltaEspecialidadComponent,
    ListaEspecialidadComponent,
    CaptchaComponent,
    CaptchaDirective,
    SeccionUsuariosComponent,
    TurnosComponent,
    FilterEspecialistaPipe,
    FilterPacientePipe,
    FilterTurnosPipe,
    EstadoDirective,
    SolicitarTurnosComponent,
    TablaTurnosComponent,
    TurnoDetalleComponent,
    TurnosFinalizadosComponent,
    TurnosPorDiaComponent,
    TurnosPorEspecialistaComponent,
    AltaHistoriaClinicaComponent,
    CantTurnosPorEspecialidadComponent,
    ExcelTurnosComponent,
    HistoriaClinicaComponent,
    ListaEspecialistasComponent,
    ListaPacientesComponent,
    LogIngresosComponent,
    MiPerfilComponent,
    MisHorariosComponent,
    MisTurnosEspecialistaComponent,
    MisTurnosComponent,
    PdfEspecialistaComponent,
    PacientesComponent,
    EstadisticasComponent,
    ResaltarDirective,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    IngresoModule,
    RecaptchaModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    CommonModule
    
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
