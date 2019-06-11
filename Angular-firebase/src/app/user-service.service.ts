import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { User } from './book/user.model';
import 'rxjs/add/operator/map';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit{

  userDoc: AngularFirestoreDocument<User>;

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  usersQuery: Observable<any[]>;

  ref = firebase.firestore().collection('users');
  data: any;
  role: string;
  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.usersCollection = this.afs.collection('users');
    this.users =  this.usersCollection.valueChanges();
  }

  getUserByEmailIdToo(email: string) {
    this.usersCollection = this.afs.collection<User>('users', ref =>
    ref.where('email', '==', email));
    this.usersQuery = this.usersCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data };
      });
    });
    return this.usersQuery;
  }

  getUserByEmail(email: string) {

    return this.afs.collection<User>('users', ref =>
      ref.where('email', '==', email)
    ).valueChanges();
  }

  getUser(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          id: doc.id,
          name: data.name,
          lname: data.lname,
          email: data.email,
          role: data.role,
          books: data.books,
          genres: data.genres
        });
      });
    });
  }

  saveUser(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          id: doc.id,
        });
      });
    });
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc<User>('users/' + user.id);
    this.userDoc.update(user);
  }

  addBookToUser(data) {

  }

}
