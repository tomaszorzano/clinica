import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Horarios } from '../clases/horarios';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  dbPathHorarios: string = "horarios";

  horariosCollection!: AngularFirestoreCollection;
  horarios!: Observable<Horarios[]>;

  constructor(public db: AngularFirestore) { 
    this.cargarHorarios()
  }

  
  cargarHorarios() {
    this.horariosCollection = this.db.collection(this.dbPathHorarios);
    this.horarios = this.horariosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Horarios;
          data.idEspecialista = a.payload.doc.id;
          return data;
        });
      }));
  }

  getHorarios() {
    return this.horarios;
  }

  addHorario(horario: Horarios):any {
    console.log(horario);
    this.horariosCollection.add({
      idEspecialista: horario.idEspecialista,
      horarioLunes: horario.horarioLunes,
      horarioMartes: horario.horarioMartes,
      horarioMiercoles: horario.horarioMiercoles,
      horarioJueves: horario.horarioJueves,
      horarioViernes: horario.horarioViernes,
      horarioSabado: horario.horarioSabado
    });
  }

}
