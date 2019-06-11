import { Component } from '@angular/core';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
  apiKey: "AIzaSyCyI74g2-UghDJb62_0GJ5dlU3HPyVcl40",
  authDomain: "books-storage-3eefb.firebaseapp.com",
  databaseURL: "https://books-storage-3eefb.firebaseio.com",
  projectId: "books-storage-3eefb",
  storageBucket: "books-storage-3eefb.appspot.com",
  messagingSenderId: "921836133338"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular6-firestore';

  constructor() { }

  ngOnInit() {
    firebase.initializeApp(config);
    firebase.firestore().settings(settings);
  }
}
