import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService.service';
import { ActivatedRoute, Router} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from '../book/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  user: User;
  email: string;
  role: string;
  userObj: User;
  isAdmin: boolean;

  constructor(private authService: AuthService,
              private route: ActivatedRoute, private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.userObj = this.authService.user;
    this.getUserInfo(this.route.snapshot.params['email']);
  }

  getUserInfo(email) {
    this.isAdmin = this.authService.isAdmin();
    this.userService.getUserByEmail(email)
    .subscribe(
      data => {
        this.user = data[0];
        this.role = data[0].role;
      }
    );
  }

  returnBook(bookId) {
    const result2 = this.userObj.books.filter( book => book.id !== bookId);
    this.userObj.books = result2;
    this.userService.updateUser(this.userObj);
    this.router.navigate(['/review', bookId]);
  }


}
