import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  public usuarioLog$: Observable<any> = this.authSvc.afAuth.user;
  public usuarioLogueado: any;
  public formulario!: FormGroup;
  usuario!: Usuario;
  img1Perfil!: Imagen;
  img2Perfil!: Imagen;
  selectedFiles!: FileList;
  selectedFiles2!: FileList;
  percentage!: number;
  especialista = false;
  paciente = false;
  administrador = false;
  msjError!: string;
  tipoUsuario: boolean = false;;
  especialidades: any = [];
  especialidadSeleccionada: any = [];
  especialidadesSeleccionadas: any = [];
  captcha!: string;
  captchaPropio:boolean = false;
  deshabilitado:boolean = false;

  constructor(public fv: FormBuilder, private authSvc: AuthService, private usuarioSvc: UsuarioService, private router: Router) {
    this.captcha = "";
    this.formulario = fv.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ["", Validators.required],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", Validators.required],
      //tipoUsuario: ["", Validators.required],
      obraSocial: ["",],
      especialidades: ["",],
      img1Perfil: ["", Validators.required],
      img2Perfil: ["",]
    });

    this.usuarioLog$.subscribe((result: any) => {
      if(result!= null)
      {
        this.usuarioLogueado = result;
      }
    });

    //this.usuarioSvc.cargarEspecialidades();
  }

  ngOnInit(): void {
    this.cargarEspecialidades();

  }

  resolved(captchaResponse: string){
    this.captcha = captchaResponse;
  }

  resolvedPropio(captcha: boolean){
    this.captchaPropio = captcha;
    this.deshabilitado = captcha;
  }

  getTipoUsuarioAdmin() {
    this.administrador = true;
    this.especialista = false;
    this.paciente = false;
    this.tipoUsuario = true;
  }

  getTipoUsuarioPaciente(){
    this.administrador = false;
    this.especialista = false;
    this.paciente = true;
    this.tipoUsuario = true;
  }
  getTipoUsuarioEspecialista(){
    this.administrador = false;
    this.especialista = true;
    this.paciente = false;
    this.tipoUsuario = true;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;


  }
  selectFile2(event: any): void {
    this.selectedFiles2 = event.target.files;


  }


  async registrar() {

    this.usuario = new Usuario();
    this.usuario.nombre = this.formulario.controls['nombre'].value;
    this.usuario.apellido = this.formulario.controls['apellido'].value;
    this.usuario.edad = this.formulario.controls['edad'].value;
    this.usuario.DNI = this.formulario.controls['dni'].value;
    this.usuario.email = this.formulario.controls['email'].value;
    this.usuario.password = this.formulario.controls['password'].value;
    //this.usuario.tipoUsuario = this.formulario.controls['tipoUsuario'].value;
    this.usuario.obraSocial = this.formulario.controls['obraSocial'].value;
    if (this.usuario.especialista || this.usuario.administrador) {
      this.usuario.obraSocial = "";
    }
    //this.usuario.especialidades = this.formulario.controls['especialidades'].value;
    
    this.usuario.administrador = this.administrador;
    this.usuario.especialista = this.especialista;
    this.usuario.paciente = this.paciente;

    if(this.usuario.administrador){
      this.usuario.tipoUsuario = "Administrador";
    }
    if(this.usuario.especialista){
      this.usuario.tipoUsuario = "Especialista";
    }
    if(this.usuario.paciente){
      this.usuario.tipoUsuario = "Paciente";
    }

    if (this.usuario.paciente || this.usuario.administrador) {
      this.usuario.especialidades = [];
    }
    else{
      this.usuario.especialidades = this.formulario.controls['especialidades'].value;
    }

    if (this.usuario.especialista) {
      this.usuario.habilitado = false;

    }
    else {
      this.usuario.habilitado = true;
    }
    const file1 = this.selectedFiles.item(0);
    console.log(this.selectedFiles.item(0));
    //this.selectedFiles = undefined;
    if(file1 != null){
      this.img1Perfil = new Imagen(file1);
    }

    if(this.usuario.paciente){
      const file2 = this.selectedFiles2.item(0);
      console.log(this.selectedFiles2.item(0));
      if(file2 != null){
        this.img2Perfil = new Imagen(file2);
      }
    }

    this.authSvc.registro(this.usuario, this.img1Perfil, this.img2Perfil).then((result) => {
      //this.usuario.logueado = true;
      //this.usuario.fecha = new Date().toLocaleString();
      //await this.authSvc.enviarVerficacionEmail();

     //console.log(this.authSvc.usuario.id);
      
      //this.usuario.id = this.authSvc.usuario.id;

      //this.usuarioSvc.addUsuario(this.usuario);
      if(result.user){
       
  
        console.log(this.usuario);
        //this.usuarioSvc.addUsuario(this.usuario, this.img1Perfil, this.img2Perfil);
        
        this.msjError = "";
      }
    })
      .catch((res) => {
        if (res.message == "The email address is already in use by another account.") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.message == "The email address is badly formatted.") {
          this.msjError = "El formato del email no es correcto."
        }
      });
    
      
  
      //this.usuarioSvc.uploadUsuarioImg(this.img1Perfil, this.img2Perfil, this.usuario);
   

    this.router.navigate(['ingreso/envio-email']);
  }

  
  cargarEspecialidades() {
    this.usuarioSvc.getEspecialidades().subscribe((especialidades: any) => {
      this.especialidades = especialidades;
      
    });
  }

  asignarEspecialidadSeleccionada(especialidad: any){

    this.especialidadSeleccionada = especialidad;
    this.especialidadesSeleccionadas.push(this.especialidadSeleccionada.nombre);
    this.formulario.controls['especialidades'].setValue(this.especialidadesSeleccionadas);
  }

 
}