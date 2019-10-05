import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Patient } from '../interfaces/patient';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
    private patientsCollection: AngularFirestoreCollection<Patient>;
  constructor(private afs: AngularFirestore) {
    this.patientsCollection = this.afs.collection<Patient>('Patients');
  }

  getPatients(){
    return this.patientsCollection.snapshotChanges().pipe(
      map(actions=> {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        })
      })
    )
  }

  addPatient(patient: Patient){
    return this.patientsCollection.add(patient);
  }

  getPatient(id: string){
    return this.patientsCollection.doc<Patient>(id).valueChanges();
  }

  updatePatient(id: string, patient: Patient){
    return this.patientsCollection.doc<Patient>(id).update(patient);
  }

  deletePatient(id: string){
    return this.patientsCollection.doc(id).delete();
  }
}
