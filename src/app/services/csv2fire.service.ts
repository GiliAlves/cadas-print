import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cadas } from '../interface/cadas.interface';

@Injectable({
  providedIn: 'root'
})
export class Csv2fireService {
  cadasCollection: AngularFirestoreCollection<Cadas>;
  cadas$: Observable<Cadas[]>;

  constructor(private afs: AngularFirestore) {
    this.setCadas();
  }

  private setCadas(): void {
    this.cadasCollection = this.afs.collection<Cadas>('/cadas',
      (ref: CollectionReference) => ref
        .orderBy('nome', 'asc'));
  }
  getCadas(): Observable<Cadas[]> {
    return this.cadas$ = this.cadasCollection
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(cadas => {
            const data = cadas.payload.doc.data() as Cadas;
            const uid = cadas.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }
}
