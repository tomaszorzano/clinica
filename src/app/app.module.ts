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


@NgModule({
  declarations: [
    AppComponent,
    AltaUsuarioComponent,
    BienvenidaComponent,
    NavbarComponent,
    RegistroComponent,
    UsuarioDetalleComponent,
    LoginComponent,
    ListaUsuariosComponent,
    AltaEspecialidadComponent,
    ListaEspecialidadComponent,
    CaptchaComponent,
    CaptchaDirective
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
    HighchartsChartModule
    
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
