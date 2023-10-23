import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { UserServiceService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users:User[] | undefined;

  constructor(
    private router: Router,
    private userService:UserServiceService,

  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      users => {
        this.users = users;
      }
    );
  }

  public home(){
    this.router.navigate(['/home']);
  }
}
