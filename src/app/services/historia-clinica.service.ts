import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HistoriaClinica } from '../clases/historia-clinica';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  public historias;
  historis: string = 'historiaClinica';

  constructor(public router: Router, public firestore: AngularFirestore) {
    this.historias = this.firestore.collection("historiaClinica").snapshotChanges();
  }
  

}