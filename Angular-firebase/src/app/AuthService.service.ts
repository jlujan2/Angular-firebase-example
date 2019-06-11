import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { User } from "./book/user.model";
import { UserServiceService } from "./user-service.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    token: string;
    role: string;
    user: User;

    constructor(private router: Router, private userService: UserServiceService) { }

    signupUser(user: User, password: string) {

        firebase.auth().createUserWithEmailAndPassword(user.email, password)
        .then(
            () => {
                this.userService.saveUser(user.getData())
                    .subscribe(
                        res => {
                            this.role = user.role;
                            this.user = user;
                            this.user.id = res;
                            this.router.navigate(['/profile', user.email]);
                        },
                        (error) => {
                            console.log(error);
                        });
            }
        )
        .catch(
            error => console.log(error)
        );
    }

    signIn(email: string, password: string) {
        console.log('sign in');
        this.userService.getUserByEmailIdToo(email).subscribe(
            data => {
                this.user = data[0];
            }
        );

        this.userService.getUserByEmail(email)
            .subscribe(
                (data) => {
                  this.user = data[0];
                }
        );

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                            }
                        );
                    this.router.navigate(['/profile', email]);
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
           .then(
               (token: string) => this.token = token
           );
           return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    isAdmin() {
        if (this.user.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }
}
