import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from './usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable } from 'rxjs';
import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: any;
  public usu!: Observable<any>;
  public usuario$: Observable<any> = this.afAuth.user;
  public isLoggedIn = false;
  public isLoggedInAdmin = false;
  usuarios: Usuario[] = [];
  msjError: string = "";
  usuarioId!: any;
  usuarioLogueado!: any;
  listaUsuarios: any;
  usuariosLista: any;
  email:any;


  constructor(public afAuth: AngularFireAuth, private router: Router, private usuarioSvc: UsuarioService) {
    this.usuario$.subscribe(result => {
      if(result!= null)
      {
         this.email = result['email'];
      }
    });
    console.log(this.usuarioLogueado);
    this.listaUsuarios = this.usuarioSvc.db.collection("usuariosClinica");

    this.listaUsuarios.snapshotChanges().pipe(
      map((data: any) => {
        this.usuariosLista = new Array<Usuario>();
        data.map((item: any) => {
         
          //var turno = item;
          var usuario = new Usuario();
          usuario.id = item.payload.doc.id;
          usuario.nombre = item.payload.doc.data().nombre;
          usuario.apellido = item.payload.doc.data().apellido;
          usuario.edad = item.payload.doc.data().edad;
          //turno.paciente = new Usuario();
          usuario.DNI = item.payload.doc.data().DNI;
          usuario.email = item.payload.doc.data().email;
          usuario.password = item.payload.doc.data().password;
          usuario.obraSocial = item.payload.doc.data().obraSocial;
          console.log(item.payload.doc.data().especialidades);
          
          usuario.especialidades = item.payload.doc.data().especialidades;
          usuario.administrador = item.payload.doc.data().administrador;
          usuario.paciente = item.payload.doc.data().paciente;
          usuario.especialista = item.payload.doc.data().especialista;
          usuario.tipoUsuario = item.payload.doc.data().tipoUsuario;
          usuario.habilitado = item.payload.doc.data().habilitado;
          usuario.horarios = item.payload.doc.data().horarios;
          usuario.img1Nombre = item.payload.doc.data().img1Nombre;
          usuario.img1Url = item.payload.doc.data().img1Url;
          usuario.img2Nombre = item.payload.doc.data().img2Nombre;
          usuario.img2Url = item.payload.doc.data().img2Url;
          this.usuariosLista.push(usuario);
          if(usuario.email == this.email){
            this.usuarioLogueado = usuario;
            console.log(usuario);
            
          }
        })
      })
    ).subscribe();
    //this.usuarioLogueado = this.obtenerUsuarioLogueado();
    console.log(this.usuarios);

  }

  //login
  async login(usuario: Usuario) {
    console.log(usuario.email);
    return await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password).then((result) => {
      this.msjError = "";
      if (result.user) {
        this.usuario = new Usuario();
        this.usuario.id = result.user?.uid;
        this.usuario.email = result.user?.email;
        console.log(result.user);
        if (!result.user?.emailVerified) {
          console.log("email no verificado");
          this.router.navigate(['ingreso/envio-email']);
        }
        else {
          this.router.navigate(['bienvenida']);
        }
      }

    })
      .catch((res) => {
        console.log(res.code);
        if (res.code == "auth/email-already-in-use") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.code == "auth/invalid-email") {
          this.msjError = "El formato del email no es correcto."
        }
      });

  }

  //register
  async registro(usuario: Usuario, img1: Imagen, img2: Imagen): Promise<any> {

  
      return await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password).then((result) => {
        this.msjError = "";
  
        if(result.user){
          result.user?.sendEmailVerification();
          this.usuarioSvc.addUsuario(usuario, img1, img2);
        }
      });


    // return await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password).then((result) => {
    //   this.msjError = "";
    //   result.user?.sendEmailVerification();
    //   console.log(result);

    // })
    //   .catch((res) => {
    //     console.log(res.message);
    //     if (res.code == "auth/email-already-in-use") {
    //       this.msjError = "El email ingresado ya esta en uso."
    //     }
    //     if (res.code == "auth/invalid-email") {
    //       this.msjError = "El formato del email no es correcto."
    //     }
    //   });
  }


  public async signOut() {
    // this.isLoggedInAdmin = false;
    // this.isLoggedIn = false;
    try {
      await this.afAuth.signOut();
      //this.router.navigate(['/']);
    }
    catch (error) {
      console.log(error);

    }
  }

  async enviarVerficacionEmail() {
    console.log(this.afAuth.currentUser);
    //await this.afAuth.currentUser?.sendEmailVerification();

  }

  verificarAprobacionAdmin(usuario: Usuario) {
    this.usuarios.forEach(item => {
      if (item.email === usuario.email) {
        if (item.habilitado) {
          return true;
        }
        else {
          return false;
        }
      }
      return false;
    });
  }

  obtenerUsuaurioActual() {
    this.afAuth.authState.subscribe(usuario => {
      return usuario;
    });

  }


  obtenerUsuarioLogueado(){
    var usuarios;
    var usuario;
    var email = "";
    this.usuario$.subscribe(result => {
      if(result!= null)
      {
         email = result['email'];
      }
    });
    
    this.usuarioSvc.getUsuarios().subscribe( res => {
      usuarios = res;
      if(usuarios != null){
        usuarios.forEach((element) => {
          if(element.email = email)
          {
            usuario = element;
          }

        });
       
      }
    });
    console.log(usuario);
    
    return usuario;
  }
}