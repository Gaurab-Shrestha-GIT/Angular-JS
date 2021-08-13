import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Crud } from '../model/crud';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private afc: AngularFirestore) {}
  addToFirebase(value: Crud) {
    this.afc
      .collection('student')
      .add(value)
      .then((e) => {
        console.log('Updated');
      });
  }
  getAllValue() {
    return this.afc.collection('student').snapshotChanges();
  }
  getOneValue(id: any) {
    return this.afc.collection('student').doc(id).get(id);
  }
  update(id: any, value: Crud) {
    return this.afc.collection('student').doc(id).update(value);
  }

  delete(id: any) {
    return this.afc.collection('student').doc(id).delete();
  }
}
