import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';
import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //public usuario$: Observable<any> = this.authSvc.afAuth.user;
  dbPathUsuarios: string = "usuariosClinica";
  dbPathEspecialidades: string = "especialidades";
  dbPathLogs: string = "logIngresosClinica";

  logIngresosCollection: Array<any> = [];
  usuariosCollection!: AngularFirestoreCollection;
  usuarios!: Observable<Usuario[]>;
  usuariosLog: any[] = [];

  especialidadesCollection!: AngularFirestoreCollection;
  especialidades!: Observable<any[]>;

  usuarioId!: any;
  usuarioLogueado!: any;
  usLog: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {
    this.cargarUsuarios();
    this.cargarEspecialidades();
  }

  // getUsuario(uid: any): Observable<any> {
  //   return this.db.collection(this.dbPathUsuarios).doc(uid).get();
  // }



  addUsuario(usuario: Usuario, img1: Imagen, img2: Imagen) {
    console.log(usuario);
    this.db.collection(this.dbPathUsuarios).add({
      id: "",
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      DNI: usuario.DNI,
      email: usuario.email,
      password: usuario.password,
      tipoUsuario: usuario.tipoUsuario,
      obraSocial: usuario.obraSocial,
      especialidades: usuario.especialidades,
      administrador: usuario.administrador,
      especialista: usuario.especialista,
      paciente: usuario.paciente,
      img1Nombre: "",
      img1Url: "",
      img2Nombre: "",
      img2Url: "",
      horarios: "",
      habilitado: usuario.habilitado
    }).then(result => {
      console.log(result);
      
      if(result.id){
        console.log(result);
        this.uploadUsuarioImg(img1, img2, usuario, result.id);
      }

    });
  }

  cargarUsuarios() {
    this.usuariosCollection = this.db.collection(this.dbPathUsuarios);
    this.usuarios = this.usuariosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }



  cargarUsuariosLog() {

    this.usLog = this.getUsuarios();
    console.log(this.usLog);
    this.usuariosLog = [];

    this.usLog.subscribe((usuarios: any) => {
      console.log(usuarios);
      usuarios.forEach((element: any) => {
        if (element.email == "leliseo89@hotmail.com") {
          this.usuariosLog.push(element);
        }
        if (element.email == "alegrepatricia72@gmail.com") {
          this.usuariosLog.push(element);
        }
        if (element.email == "rominapuertas91@gmail.com") {
          this.usuariosLog.push(element);
        }
      });

    });
  }

  onUpload(filePath: string, file: any) {
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

  // uploadUsuarioImg(img: Imagen, usuario: Usuario): Observable<any> {
  //   const filePath = `${this.dbPathUsuarios}/${img.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, img.file);

  //   uploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       storageRef.getDownloadURL().subscribe(downloadURL => {
  //         img.url = downloadURL;
  //         img.nombre = img.file.name;
  //         this.addUsuario(usuario, img);
  //       });
  //     })
  //   ).subscribe();

  //   return uploadTask.percentageChanges();
  // }
  uploadUsuarioImg(img1: Imagen, img2: Imagen, usuario: Usuario, id:string) {
    const filePath = `${this.dbPathUsuarios}/${usuario.email}/${img1.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, img1.file);

    //var porcentaje = this.uploadImagen(img1).subscribe({complete(){}});
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          img1.url = downloadURL;
          const tutorialsRef = this.db.collection(this.dbPathUsuarios);
            tutorialsRef.doc(id).update({ img1Nombre: img1.file.name, img1Url: img1.url });
          //this.updateUsuarioImg(usuario.email, { img1Nombre: img1.file.name, img1Url: img1.url });
          //img1.nombre = img1.file.name;
          //this.addUsuario(usuario, img1, img2);
        });
      })
    ).subscribe();

    if (usuario.paciente) {
      const filePath2 = `${this.dbPathUsuarios}/${usuario.email}/${img2.file.name}`;
      const storageRef2 = this.storage.ref(filePath);
      const uploadTask2 = this.storage.upload(filePath2, img2.file);
      uploadTask2.snapshotChanges().pipe(
        finalize(() => {
          storageRef2.getDownloadURL().subscribe(downloadURL => {
            img2.url = downloadURL;
            //this.updateUsuarioImg(usuario.email, { img2Nombre: img2.file.name, img2Url: img2.url });
            const tutorialsRef = this.db.collection(this.dbPathUsuarios);
            tutorialsRef.doc(id).update({ img2Nombre: img2.file.name, img2Url: img2.url });
          });
        })
      ).subscribe();
    }
  }

  updateUsuarioImg(email: any, data: any) {

 
    this.getUsuarioByEmail(email).snapshotChanges().pipe(map((data: any) => {
      data.map((us: any) => {
        this.usuarioId = us.payload.doc.id;
      })
    })
    ).subscribe();

    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(this.usuarioId).update(data);
  }

  uploadImagen(img: Imagen, usuario: Usuario) {
    const filePath = `${this.dbPathUsuarios}/${usuario.email}/${img.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, img.file);


    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          img.url = downloadURL;
          //img.file.name = img.file.name;
          var data = { img1Nombre: img.file.name, img1Url: img.url };
          var data2 = { img2Nombre: img.file.name, img2Url: img.url };
          var data1grabado = false;
          if (!usuario.paciente) {
            this.updateUsuarioImg(usuario.id, data);
            console.log("grabo data 1");

            //this.updateUsuarioImg(usuario.id, data2);
            if (!usuario.img2Url) {
              this.updateUsuarioImg(usuario.id, data2);
              console.log("grabo data 2");
            }
          }
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges()
  }


  getUsuarioByEmail(email: string): any {
    return this.db.collection("usuariosClinica", ref => ref.where('email', '==', email));
  }

  deleteFile(img: Imagen): void {
    this.deleteFileStorage(img.nombre);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.dbPathUsuarios);
    storageRef.child(name).delete();
  }

  updateUsuario(usuario: Usuario) {
    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(usuario.id).update({ aprobado: usuario.especialista });
  }

  updateUsuarioEspecialista(usuario: Usuario) {
    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(usuario.id).update({ habilitado: usuario.habilitado });
  }

  updateUsuarioHorarios(usuario: Usuario) {
    console.log(usuario.horarios);

    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(usuario.id).update({ horarios: Object.assign({}, usuario.horarios) });
  }

  getUsuarios() {
    return this.usuarios;
  }

  // getUsuariosLog(){
  //   this.getUsuario("zqHBSsl2hOYW7dwStPXF").subscribe(u => {
  //     var usuario = u;
  //     console.log(usuario);
  //    this.usuariosLog.push(usuario);
  //   });

  //   return this.usuariosLog;
  // }

  cargarEspecialidades() {
    this.especialidadesCollection = this.db.collection(this.dbPathEspecialidades);
    this.usuarios = this.usuariosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
    this.especialidades = this.especialidadesCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          return data;
        });
      }));
    console.log(this.especialidadesCollection);
  }

  addEspecilidad(especialidad: string) {
    this.especialidadesCollection.add({
      nombre: especialidad
    });
  }

  getEspecialidades() {
    return this.especialidades;
  }

  addLogIngresos(email: string) {
    console.log(this.usuariosCollection);
    var fecha = new Date();
    this.db.collection(this.dbPathLogs).add({
      email: email,
      fecha: fecha.toLocaleDateString(),
      hora: fecha.toLocaleTimeString()
    });
  }

  getCollection(collection: string){
    return this.db.collection<any>(collection).valueChanges({idField: "id"});
  }

  getEspecialistas(){
    return this.db.collection<any>(this.dbPathUsuarios, ref => ref.where('especialista', '==', true)).valueChanges({idField: "id"});
  }
  
  
}