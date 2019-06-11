import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BookListComponent } from './book-list/book-list.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Routes, RouterModule } from '@angular/router';
import { BookSaveComponent } from './book-save/book-save.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule } from "@angular/material";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './AuthService.service';
import { ReturnViewComponent } from './return-view/return-view.component';
import { BookIssuedComponent } from './book-issued/book-issued.component';

const appRoutes: Routes = [

  {
    path: 'profile/:email',
    component: UserProfileComponent,
    data: { title: 'User Profile'}
  },
  {
    path: 'review/:id',
    component: ReturnViewComponent,
    data: { title: 'review book'}
  },
  {
    path: 'book-issued/:id',
    component: BookIssuedComponent,
    data: { title: 'Books Issued'}
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: { title: 'Sign in'}
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign up'}
  },
  {
    path: 'books',
    component: BookListComponent,
    data: { title: 'Book List'}
  },
  {
    path: 'book-details/:id',
    component: BookDetailComponent,
    data: { title: 'Book Details'}
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    data: { title: 'Book Edit'}
  },
  {
    path: 'books-save',
    component: BookSaveComponent,
    data: { title: 'Book Save'}
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  }
];

const config = {
  apiKey: "AIzaSyCyI74g2-UghDJb62_0GJ5dlU3HPyVcl40",
  authDomain: "books-storage-3eefb.firebaseapp.com",
  databaseURL: "https://books-storage-3eefb.firebaseio.com",
  projectId: "books-storage-3eefb",
  storageBucket: "books-storage-3eefb.appspot.com",
  messagingSenderId: "921836133338"
};


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookSaveComponent,
    BookDetailComponent,
    BookEditComponent,
    UserProfileComponent,
    SigninComponent,
    SignupComponent,
    ReturnViewComponent,
    BookIssuedComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
