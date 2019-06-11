import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService.service';
import { User } from '../book/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fname: string = '';
  lname: string = '';
  role: string = '';
  email: string = '';
  password: string = '';


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    let user = new User(this.fname, this.lname, this.email, this.role);
    this.authService.signupUser(user, this.password);
  }

}
