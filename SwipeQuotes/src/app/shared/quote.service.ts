import { Injectable } from '@angular/core';
import { Quote } from './quote.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  formData: Quote;

  constructor(private firestore:AngularFirestore) { }

  getQuotes(){
    return this.firestore.collection('quotes').snapshotChanges();
  }
}
